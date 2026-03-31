import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";
import { useWallet } from "../context/WalletContext";
import "../assets/css/AddProductPage.css"; // Nhúng CSS

function AddProductPage() {
  const navigate = useNavigate();
  const { account, isConnected } = useWallet();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    depositAmount: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm rút gọn ví hiển thị
  const formatWallet = (wallet) => {
    if (!wallet) return "";
    return `${wallet.slice(0, 8)}...${wallet.slice(-6)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected || !account) {
      setError("Bạn cần kết nối ví MetaMask trước khi đăng sản phẩm.");
      return;
    }
    if (Number(formData.depositAmount) >= Number(formData.price)) {
      setError("Số tiền đặt cọc phải nhỏ hơn giá bán.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        depositAmount: Number(formData.depositAmount),
        imageUrl: formData.imageUrl,
        sellerWallet: account,
      };

      await createProduct(payload);

      setSuccessMessage("Khởi tạo giao dịch thành công. Đang chuyển hướng...");

      setFormData({
        name: "",
        description: "",
        price: "",
        depositAmount: "",
        imageUrl: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Không thể đăng sản phẩm.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      depositAmount: "",
      imageUrl: "",
    });
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="oc-add-page">
      <div className="oc-add-header">
        <h1 className="oc-add-title">Tạo Hợp Đồng Mới</h1>
        <p className="oc-add-subtitle">
          Đăng bán sản phẩm của bạn lên Blockchain an toàn và minh bạch.
        </p>
      </div>

      <div className="oc-add-container">
        {/* Cột trái: Form nhập liệu */}
        <div className="oc-add-form-section">
          {/* Box hiển thị trạng thái ví */}
          <div
            className={`oc-add-wallet-box ${isConnected ? "connected" : "disconnected"}`}
          >
            <span className="oc-add-wallet-icon">💳</span>
            <div className="oc-add-wallet-text">
              <span className="oc-add-wallet-label">
                Người bán (Ví kết nối):
              </span>
              <strong className="oc-add-wallet-address">
                {isConnected ? formatWallet(account) : "Chưa kết nối MetaMask"}
              </strong>
            </div>
          </div>

          <form className="oc-add-form" onSubmit={handleSubmit}>
            <div className="oc-add-input-group">
              <label>
                Tên sản phẩm <span className="oc-add-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ví dụ: Bàn phím cơ Keychron K2..."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="oc-add-row">
              <div className="oc-add-input-group">
                <label>
                  Giá bán (VLDM) <span className="oc-add-required">*</span>
                </label>
                <div className="oc-add-input-wrapper">
                  <span className="oc-add-input-prefix">⟠</span>
                  <input
                    type="number"
                    step="0.0001"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="oc-add-input-group">
                <label>
                  Tiền cọc yêu cầu (VLDM){" "}
                  <span className="oc-add-required">*</span>
                </label>
                <div className="oc-add-input-wrapper">
                  <span className="oc-add-input-prefix">⟠</span>
                  <input
                    type="number"
                    step="0.0001"
                    name="depositAmount"
                    placeholder="0.00"
                    value={formData.depositAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="oc-add-input-group">
              <label>Mô tả chi tiết</label>
              <textarea
                name="description"
                placeholder="Tình trạng, cấu hình, xuất xứ..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="oc-add-input-group">
              <label>Đường dẫn hình ảnh (URL)</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            {/* Hiển thị thông báo Lỗi / Thành công */}
            {error && (
              <div className="oc-add-alert oc-add-error">
                <span className="oc-add-alert-icon">⚠️</span> {error}
              </div>
            )}
            {successMessage && (
              <div className="oc-add-alert oc-add-success">
                <span className="oc-add-alert-icon">✅</span> {successMessage}
              </div>
            )}

            <div className="oc-add-actions">
              <button
                type="button"
                className="oc-add-btn oc-add-btn-outline"
                onClick={handleReset}
                disabled={loading}
              >
                Xóa làm lại
              </button>
              <button
                type="submit"
                className="oc-add-btn oc-add-btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="oc-add-spinner"></span>
                ) : (
                  "Phát hành & Đăng bán"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Cột phải: Image Preview */}
        <div className="oc-add-preview-section">
          <label className="oc-add-preview-label">Xem trước hình ảnh</label>
          <div className="oc-add-preview-box">
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="oc-add-preview-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found";
                }}
              />
            ) : (
              <div className="oc-add-preview-placeholder">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p>Nhập URL để xem trước ảnh</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
