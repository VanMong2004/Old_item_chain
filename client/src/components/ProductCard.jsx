import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>
      <p>Giá: {product.price} VNĐ</p>
      <p>Đặt cọc: {product.depositAmount} VNĐ</p>
      <p>Người bán: {product.sellerWallet}</p>

      <StatusBadge status={product.status} />

      <Link to={`/product/${product.id}`} className="btn secondary">
        Xem chi tiết
      </Link>
    </div>
  );
}

export default ProductCard;
