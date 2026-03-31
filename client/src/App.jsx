import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/css/index.css";
import AddProductPage from "./pages/AddProductPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WalletPage from "./pages/WalletPage";
function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
