import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderItemDetail from "../components/OrderItemDetail";
import "../styles/OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/composer/orders/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el pedido.");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles del pedido...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <main className="order-details-container">
        <h2>Order Details</h2>
        <p>Pedido No. <strong>{order.orderId}</strong></p>
        <p>Fecha: <strong>{new Date(order.orderDate).toLocaleDateString()}</strong></p>
        <p>Estado: <strong>{order.status}</strong></p>

        <div className="order-items">
          {order.orderDetails.map((item) => (
            <OrderItemDetail key={item.bookId} item={item} />
          ))}
        </div>

        <div className="order-summary">
          <h3>Total: <strong>US${order.total.toFixed(2)}</strong></h3>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;
