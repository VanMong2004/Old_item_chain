import ProductCard from "../components/ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Laptop Dell cũ",
    price: 4500000,
    depositAmount: 500000,
    sellerWallet: "0x12ab...45ef",
    status: "available",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "iPhone 11",
    price: 5000000,
    depositAmount: 1000000,
    sellerWallet: "0x98cd...76xy",
    status: "deposited",
    imageUrl: "https://via.placeholder.com/300x200",
  },
];

function HomePage() {
  return (
    <div className="page">
      <h1>Danh sách sản phẩm</h1>

      <div className="toolbar">
        <input type="text" placeholder="Tìm sản phẩm..." />
        <select>
          <option>Tất cả trạng thái</option>
          <option>available</option>
          <option>deposited</option>
          <option>sold</option>
        </select>
      </div>

      <div className="product-grid">
        {mockProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
