import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderItemDetail from "../components/OrderItemDetail";
import OrderSummary from "../components/OrderSummary";
import "../styles/OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();

  // Datos de prueba (serán reemplazados con datos reales del backend)
  const order = {
    id: id,
    date: "23/12/2024",
    status: "Pendiente",
    total: "170,7",
    items: [
      { id: 1, title: "The Time Has Come", unitPrice: 56.9, quantity: 2, image: "https://via.placeholder.com/100x150" },
      { id: 2, title: "The Time Has Come", unitPrice: 56.9, quantity: 2, image: "https://via.placeholder.com/100x150" },
      { id: 3, title: "The Time Has Come", unitPrice: 56.9, quantity: 2, image: "https://via.placeholder.com/100x150" },
    ]
  };

  const handleCancelOrder = () => {
    alert(`Pedido #${order.id} cancelado`);
  };

  return (
    <div>
      <Header />
      <main className="order-details-container">
        <h2>Order details</h2>
        <p>Comprado el <strong>{order.date}</strong>  Pedido no. <strong>{order.id}</strong></p>

        <div className="order-details-content">
          <div className="order-items">
            {order.items.map((item) => (
              <OrderItemDetail key={item.id} item={item} />
            ))}
          </div>

          <OrderSummary total={order.total} status={order.status} onCancel={handleCancelOrder} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;
