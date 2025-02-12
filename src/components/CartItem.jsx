import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "../styles/Cart.css";
import BookImage from "../assets/booksample.png"; 

const CartItem = ({ book, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img
        src={BookImage}
        alt={book.title}
        className="book-image-cart"
      />
      <div className="bookcart-details">
        <h3>{book.title}</h3>
        <p><strong>Editorial:</strong> {book.publisherName}</p>
        <p className={book.stockStatus > 0 ? "available" : "not-available"}>
          {book.stockStatus > 0 ? "Disponible" : "No disponible"}
        </p>

        <div className="quantity-controls">
          <button onClick={() => updateQuantity(book.bookId, book.quantity - 1)} disabled={book.quantity === 1}>
            <FaMinus />
          </button>
          <span>{book.quantity}</span>
          <button onClick={() => updateQuantity(book.bookId, book.quantity + 1)}>
            <FaPlus />
          </button>
          <button onClick={() => removeItem(book.cartDetailId)}>
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="book-price">US${book.unitPrice.toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
