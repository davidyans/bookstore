import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "../styles/Cart.css";
import BookImage from "../assets/booksample.png"; 

const CartItem = ({ book, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img src={BookImage} alt={book.title} className="book-image" />
      <div className="bookcart-details">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p className={book.available ? "available" : "not-available"}>
          {book.available ? "Disponible" : "No disponible"}
        </p>

        <div className="quantity-controls">
          <button onClick={() => updateQuantity(book.id, book.quantity - 1)} disabled={book.quantity === 1}>
            <FaMinus />
          </button>
          <span>{book.quantity}</span>
          <button onClick={() => updateQuantity(book.id, book.quantity + 1)}>
            <FaPlus />
          </button>
          <button onClick={() => removeItem(book.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="book-price">US${book.price.toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
