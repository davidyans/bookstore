import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import ShoppingCart from "./pages/ShoppingCart";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Bienvenido a la Tienda de Libros</h2>} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart/:id" element={<ShoppingCart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App
