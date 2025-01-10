import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import "../styles/Cart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "The Time Has Come",
      author: "Will Leitch",
      image: "https://via.placeholder.com/100x150",
      price: 56.9,
      quantity: 2,
      available: true,
    },
    {
      id: 2,
      title: "My Government Means to Kill Me",
      author: "Rasheed Newson",
      image: "https://via.placeholder.com/100x150",
      price: 56.9,
      quantity: 1,
      available: true,
    },
    {
      id: 3,
      title: "Pride and Protest",
      author: "Nikki Payne",
      image: "https://via.placeholder.com/100x150",
      price: 56.9,
      quantity: 5,
      available: false,
    },
  ]);

  // Función para actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  // Función para eliminar un libro del carrito
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Función para vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <main className="cart-container">
        <h2 className="cart-main-title">Shopping cart</h2>
        <button className="clear-cart" onClick={clearCart}>
          Eliminar todas las selecciones 🗑️
        </button>

        <div className="cart-content">
          <div className="cart-items">
            {cart.length > 0 ? cart.map((book) => (
              <CartItem key={book.id} book={book} updateQuantity={updateQuantity} removeItem={removeItem} />
            )) : <p>El carrito está vacío</p>}
          </div>

          <CartSummary total={total} itemCount={cart.length} checkout={() => alert("Ir a Checkout")} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
