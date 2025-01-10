import "../styles/OrderDetails.css";
import BookImage from "../assets/booksample.png"; 

const OrderItemDetail = ({ item }) => {
  return (
    <div className="order-item">
      <img src={BookImage} alt={item.title} className="order-item-image" />
      <div className="order-item-info">
        <p><strong>Título:</strong> {item.title}</p>
        <p><strong>Precio Unitario:</strong> US$ {item.unitPrice}</p>
        <p><strong>Cantidad:</strong> {item.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItemDetail;
