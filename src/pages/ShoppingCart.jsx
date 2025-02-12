import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import "../styles/Cart.css";

const ShoppingCart = () => {
  const { id } = useParams(); // Obtener el ID del carrito desde la URL
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutMessage, setCheckoutMessage] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/carts/${id}/items`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del carrito");
        }
        const cartItems = await response.json();

        const bookDetailsPromises = cartItems.map(async (item) => {
          const bookResponse = await fetch(`http://localhost:8090/api/books/${item.bookId}`);
          if (!bookResponse.ok) {
            throw new Error(`Error al obtener el libro con ID ${item.bookId}`);
          }
          const bookData = await bookResponse.json();
          return { ...item, ...bookData };
        });

        const detailedCartItems = await Promise.all(bookDetailsPromises);
        setCart(detailedCartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [id]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutMessage("El carrito está vacío.");
      return;
    }

    const orderData = {
      orderDetails: cart.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    };

    try {
      const response = await fetch("http://localhost:8090/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al procesar el pedido.");
      }

      setCheckoutMessage("Pedido realizado con éxito ✅");
      setCart([]); 
      //setTimeout(() => navigate("/orders"), 2000); 
    } catch (err) {
      setCheckoutMessage("Error al procesar el pedido ❌");
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:8090/api/carts/${id}/items/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la cantidad");
      }

      setCart(cart.map(item => (item.bookId === bookId ? { ...item, quantity: newQuantity } : item)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeItem = async (cartDetailId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este ítem del carrito?");
    if (!confirmed) return; 
  
    try {
      const response = await fetch(`http://localhost:8090/api/carts/${id}/items/${cartDetailId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el ítem del carrito");
      }
  
      setCart(cart.filter(item => item.cartDetailId !== cartDetailId));
    } catch (err) {
      console.error(err.message);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`http://localhost:8090/api/carts/${id}/items`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al vaciar el carrito");
      }

      setCart([]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

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
              <CartItem key={book.bookId} book={book} updateQuantity={updateQuantity} removeItem={removeItem} />
            )) : <p>El carrito está vacío</p>}
          </div>

          <CartSummary 
            total={total} 
            itemCount={cart.length} 
            checkout={handleCheckout} 
            isCartEmpty={cart.length === 0} 
          />
        </div>

        {/* Mensaje de confirmación o error */}
        {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
