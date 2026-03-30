function ProductDetailPage() {
  const product = {
    name: "Laptop Dell cũ",
    description: "Máy còn hoạt động tốt, RAM 8GB, SSD 256GB",
    price: 4500000,
    depositAmount: 500000,
    sellerWallet: "0x12ab...45ef",
    status: "available",
    imageUrl: "https://via.placeholder.com/500x300",
  };

  return (
    <div className="page detail-page">
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Giá bán: {product.price} VNĐ</p>
          <p>Tiền đặt cọc: {product.depositAmount} VNĐ</p>
          <p>Người bán: {product.sellerWallet}</p>
          <p>Trạng thái: {product.status}</p>

          <div className="detail-actions">
            <button className="btn primary">Đặt cọc bằng MetaMask</button>
            <button className="btn success">Thanh toán hoàn tất</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
