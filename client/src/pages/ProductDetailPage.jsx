import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { getProductById } from "../services/productService";
import {
  createDepositTransaction,
  createCompleteTransaction,
} from "../services/transactionService";
import { useWallet } from "../context/WalletContext";
import "../assets/css/ProductDetailPage.css"; // Nhúng CSS
import { Trash2 } from "lucide-react";
import apiClient from "../services/apiClient";
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, signer, isConnected } = useWallet();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Không tải được chi tiết sản phẩm.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  // UX Highlight: Rút gọn ví hiển thị
  const formatWallet = (wallet) => {
    if (!wallet) return "Không xác định";
    return `${wallet.slice(0, 8)}...${wallet.slice(-6)}`;
  };

  // Tính toán số tiền còn lại
  const remainAmount = product
    ? (Number(product.price) - Number(product.depositAmount)).toFixed(3)
    : 0;

  const handleDeposit = async () => {
    if (!isConnected || !account || !signer) {
      setError("Bạn cần kết nối MetaMask trước.");
      return;
    }
    if (!product) return;
    if (account.toLowerCase() === product.sellerWallet.toLowerCase()) {
      setError("Lỗi: Bạn không thể tự mua sản phẩm của chính mình.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccessMessage("");

      const tx = await signer.sendTransaction({
        to: product.sellerWallet,
        value: ethers.parseEther(product.depositAmount.toString()),
      });

      // Feedback cho người dùng khi chờ mạng lưới
      setSuccessMessage(
        "Đã ký giao dịch! Đang chờ mạng lưới Blockchain xác nhận...",
      );
      await tx.wait();

      await createDepositTransaction({
        productId: product._id,
        buyerWallet: account,
        txHashLocal: tx.hash,
      });

      setSuccessMessage(
        "Đặt cọc thành công! Giao dịch đã được ghi nhận trên chuỗi.",
      );
      await fetchProduct();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Giao dịch đặt cọc thất bại hoặc bị từ chối.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!isConnected || !account || !signer) {
      setError("Bạn cần kết nối MetaMask trước.");
      return;
    }
    if (!product) return;
    if (account.toLowerCase() === product.sellerWallet.toLowerCase()) {
      setError("Lỗi: Bạn không thể tự thanh toán sản phẩm của chính mình.");
      return;
    }
    if (
      product.buyerWallet &&
      account.toLowerCase() !== product.buyerWallet.toLowerCase()
    ) {
      setError("Chỉ người đã đặt cọc mới được thanh toán hoàn tất.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccessMessage("");

      const tx = await signer.sendTransaction({
        to: product.sellerWallet,
        value: ethers.parseEther(remainAmount.toString()),
      });

      setSuccessMessage(
        "Đã ký giao dịch! Đang chờ mạng lưới Blockchain xác nhận...",
      );
      await tx.wait();

      await createCompleteTransaction({
        productId: product._id,
        buyerWallet: account,
        txHashLocal: tx.hash,
      });

      setSuccessMessage("Thanh toán hoàn tất! Bạn đã sở hữu sản phẩm này.");
      await fetchProduct();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Thanh toán thất bại hoặc bị từ chối.",
      );
    } finally {
      setActionLoading(false);
    }
  };
  // Xóa
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm?");
      if (!confirmDelete) return;

      const response = await apiClient.delete(`/products/${product._id}`, {
        data: { sellerWallet: account },
      });

      alert(response.data.message || "Xóa thành công");
      navigate("/");
    } catch (err) {
      console.error("DELETE FRONTEND ERROR =", err);
      console.error("DELETE FRONTEND ERROR RESPONSE =", err.response?.data);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Lỗi xóa sản phẩm",
      );
    }
  };
  // Render các trạng thái Loading / Error
  if (loading) {
    return (
      <div className="oc-detail-container">
        <div className="oc-detail-state-box">
          <div className="oc-detail-spinner"></div>
          <p>Đang trích xuất dữ liệu từ Hợp đồng thông minh...</p>
        </div>
      </div>
    );
  }

  if ((error && !product) || !product) {
    return (
      <div className="oc-detail-container">
        <div className="oc-detail-state-box error">
          <span className="oc-detail-icon-large">⚠️</span>
          <h2>Lỗi Truy Xuất</h2>
          <p>{error || "Không tìm thấy dữ liệu sản phẩm trên hệ thống."}</p>
          <button
            className="oc-detail-btn oc-detail-btn-outline"
            onClick={() => navigate("/")}
          >
            ← Trở về Chợ Đồ Cũ
          </button>
        </div>
      </div>
    );
  }

  // Map class trạng thái để hiển thị màu sắc phù hợp
  const getStatusDisplay = (status) => {
    switch (status) {
      case "available":
        return { label: "Sẵn sàng giao dịch", class: "status-available" };
      case "deposited":
        return { label: "Đã có người đặt cọc", class: "status-deposited" };
      case "sold":
        return { label: "Đã hoàn tất giao dịch", class: "status-sold" };
      default:
        return { label: status, class: "" };
    }
  };
  const statusInfo = getStatusDisplay(product.status);

  return (
    <div className="oc-detail-container">
      {/* Nút Back nằm ngoài layout chính để dễ thao tác */}
      <button className="oc-detail-back-btn" onClick={() => navigate("/")}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Quay lại
      </button>

      <div className="oc-detail-grid">
        {/* Cột Trái: Hình ảnh & Mô tả */}
        <div className="oc-detail-visuals">
          <div className="oc-detail-image-box">
            <img
              src={
                product.imageUrl ||
                "https://placehold.co/800x600/f1f5f9/94a3b8?text=No+Image"
              }
              alt={product.name}
              className="oc-detail-image"
            />
            <div className={`oc-detail-status-badge ${statusInfo.class}`}>
              {statusInfo.label}
            </div>
          </div>

          <div className="oc-detail-desc-box">
            <h3>Chi tiết sản phẩm</h3>
            <p>
              {product.description ||
                "Người bán không cung cấp mô tả chi tiết cho sản phẩm này."}
            </p>
          </div>
        </div>

        {/* Cột Phải: Bảng Giao dịch (Checkout Panel) */}
        <div className="oc-detail-checkout">
          <div className="oc-detail-group">
            <h1 className="oc-detail-title">{product.name}</h1>
            {account?.toLowerCase() === product.sellerWallet?.toLowerCase() &&
              product.status === "available" && (
                <button className="oc-detail-delete" onClick={handleDelete}>
                  <Trash2 size={20} />
                </button>
              )}
          </div>
          <div>
            <div className="oc-detail-seller">
              <p className="label">Đăng bởi:</p>

              <span className="wallet" title={product.sellerWallet}>
                {formatWallet(product.sellerWallet)}
              </span>
            </div>
            <div className="oc-detail-buyer">
              <p className="label">Người đã đặt cọc:</p>{" "}
              <span className="wallet" title={product.buyerWallet}>
                {formatWallet(product.buyerWallet) || "Chưa có"}
              </span>
            </div>
          </div>

          {/* Bảng giá trị */}
          <div className="oc-detail-receipt">
            <div className="receipt-row total">
              <span>Giá niêm yết</span>
              <strong>⟠ {product.price} VLDM</strong>
            </div>
            <div className="receipt-row">
              <span>Yêu cầu đặt cọc</span>
              <span className="amount-deposit">
                ⟠ {product.depositAmount} VLDM
              </span>
            </div>
            {product.status === "deposited" && (
              <div className="receipt-row highlight">
                <span>Số tiền cần thanh toán</span>
                <span className="amount-remain">⟠ {remainAmount} VLDM</span>
              </div>
            )}
          </div>

          {/* Cảnh báo / Thông báo */}
          {error && (
            <div className="oc-detail-alert error">
              <span className="icon">⚠️</span> {error}
            </div>
          )}
          {successMessage && (
            <div className="oc-detail-alert success">
              <span className="icon">✅</span> {successMessage}
            </div>
          )}

          {/* Khu vực Nút Hành động */}
          <div className="oc-detail-actions">
            {!isConnected ? (
              <div className="oc-detail-alert warning">
                Vui lòng kết nối ví MetaMask ở góc phải màn hình để thực hiện
                giao dịch.
              </div>
            ) : (
              <>
                {product.status === "available" && (
                  <button
                    className="oc-detail-btn oc-detail-btn-primary"
                    onClick={handleDeposit}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <div className="oc-detail-processing">
                        <span className="spinner"></span>
                        <span>Đang xử lý giao dịch...</span>
                      </div>
                    ) : (
                      <>Đặt cọc ngay (⟠ {product.depositAmount} VLDM)</>
                    )}
                  </button>
                )}

                {product.status === "deposited" && (
                  <button
                    className="oc-detail-btn oc-detail-btn-success"
                    onClick={handleComplete}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <span className="spinner"></span> Đang xử lý giao
                        dịch...
                      </>
                    ) : (
                      <>Thanh toán phần còn lại (⟠ {remainAmount} VLDM)</>
                    )}
                  </button>
                )}

                {product.status === "sold" && (
                  <button
                    className="oc-detail-btn oc-detail-btn-disabled"
                    disabled
                  >
                    Sản phẩm này đã được bán
                  </button>
                )}
              </>
            )}
          </div>

          {/* Note nhỏ giải thích cơ chế Blockchain */}
          <p className="oc-detail-trust-note">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Giao dịch được bảo vệ và xác thực hoàn toàn thông qua Hợp đồng thông
            minh trên mạng lưới Blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
