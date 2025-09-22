import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
