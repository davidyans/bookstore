import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import ShoppingCart from "./pages/ShoppingCart";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App
