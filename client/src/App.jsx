import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import HistoryPage from "./pages/HistoryPage";
import WalletPage from "./pages/WalletPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
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
