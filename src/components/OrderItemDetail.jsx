import "../styles/OrderDetails.css";
import BookImage_1 from "../assets/booksample.png"; 
import BookImage_2 from "../assets/tgg.webp"; 
import BookImage_3 from "../assets/1984.webp"; 

const getBookImage = (title) => {
  switch (title) {
    case "The Great Gatsby":
      return BookImage_2;
    case "1984":
      return BookImage_3;
    case "To Kill a Mockingbird":
      return BookImage_1;
    default:
      return "https://via.placeholder.com/100x150"; // Imagen por defecto
  }
};

const OrderItemDetail = ({ item }) => {
  return (
    <div className="order-item">
      <img src={getBookImage(item.title)} alt={item.title} className="order-item-image" />
      <div className="order-item-info">
        <p><strong>Título:</strong> {item.title}</p>
        <p><strong>Precio Unitario:</strong> US$ {item.unitPrice}</p>
        <p><strong>Cantidad:</strong> {item.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItemDetail;
