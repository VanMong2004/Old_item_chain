import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import "../assets/css/ProductCard.css";

function ProductCard({ product }) {
  const formatWallet = (address) => {
    if (!address) return "Chưa cập nhật";
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <article className="oc-card-wrapper">
      {/* Khu vực Hình ảnh */}
      <div className="oc-card-img-box">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="oc-card-img"
          loading="lazy"
        />
        <div className="oc-card-badge">
          <StatusBadge status={product.status} />
        </div>
      </div>

      {/* Khu vực Nội dung */}
      <div className="oc-card-body">
        <h3 className="oc-card-title" title={product.name}>
          {product.name}
        </h3>

        <div className="oc-card-info">
          <div className="oc-card-row">
            <span className="oc-card-label">Giá bán:</span>
            <span className="oc-card-val oc-card-price">
              <span className="oc-card-eth-icon">⟠</span> {product.price} VLDM
            </span>
          </div>

          <div className="oc-card-row">
            <span className="oc-card-label">Cọc yêu cầu:</span>
            <span className="oc-card-val oc-card-deposit">
              {product.depositAmount} VLDM
            </span>
          </div>

          <div className="oc-card-row">
            <span className="oc-card-label">Người bán:</span>
            <span
              className="oc-card-val oc-card-wallet"
              title={product.sellerWallet}
            >
              {formatWallet(product.sellerWallet)}
            </span>
          </div>
        </div>
      </div>
      {/* Khu vực Nút bấm */}
      <div className="oc-card-footer">
        <Link to={`/product/${product.id}`} className="oc-card-btn">
          <span>Xem chi tiết</span>
          <span className="oc-card-btn-icon">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
