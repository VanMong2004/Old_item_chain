import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import "../assets/css/HomePage.css"; // Nhúng file CSS giao diện

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Lỗi tải sản phẩm",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (keyword.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }
    setFilteredProducts(result);
  }, [keyword, statusFilter, products]);

  return (
    <div className="home-page">
      {/* Tiêu đề trang */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🛒</span> Khám Phá Sản Phẩm
        </h1>
        <p className="page-subtitle">
          Mua bán đồ cũ nội bộ minh bạch — Xác thực tự động qua Blockchain
        </p>
      </div>

      {/* Thanh công cụ Tìm kiếm & Lọc */}
      <div className="toolbar-container">
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm tên sản phẩm, ví dụ: Bàn phím..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="available">🟢 Đang mở bán (Có sẵn)</option>
              <option value="deposited">🟡 Đang giao dịch (Đã cọc)</option>
              <option value="sold">🔴 Đã hoàn tất (Đã bán)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Khu vực hiển thị Trạng thái (Loading, Error, Empty) */}
      <div className="status-container">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang đồng bộ dữ liệu từ Blockchain...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchProducts}>
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Hãy thử thay đổi từ khóa hoặc bộ lọc trạng thái xem sao.</p>
          </div>
        )}
      </div>

      {/* Lưới sản phẩm */}
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item._id}
            product={{
              id: item._id,
              name: item.name,
              price: item.price,
              depositAmount: item.depositAmount,
              sellerWallet: item.sellerWallet,
              status: item.status,
              imageUrl: item.imageUrl || "https://via.placeholder.com/300x200",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
