function AddProductPage() {
  return (
    <div className="page form-page">
      <h1>Đăng sản phẩm</h1>

      <form className="product-form">
        <label>Tên sản phẩm</label>
        <input type="text" placeholder="Nhập tên sản phẩm" />

        <label>Mô tả</label>
        <textarea placeholder="Nhập mô tả sản phẩm" />

        <label>Giá bán</label>
        <input type="number" placeholder="Nhập giá bán" />

        <label>Tiền đặt cọc</label>
        <input type="number" placeholder="Nhập tiền đặt cọc" />

        <label>Link ảnh</label>
        <input type="text" placeholder="Nhập link ảnh" />

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Đăng sản phẩm
          </button>
          <button type="reset" className="btn secondary">
            Xóa form
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
