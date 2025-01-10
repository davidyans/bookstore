import { useState } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import "../styles/BookDetailsCard.css";
import BookImage from "../assets/booksample.png"; 

const BookDetailsCard = () => {
  const [quantity, setQuantity] = useState(1);

  const book = {
    coverImage: "https://via.placeholder.com/400x600",
    title: "Chain of Gold: The Last Hours #1",
    author: "Cassandra Clare",
    rating: 4.5,
    price: "$12.49",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    publisher: "Margaret K. Books",
    language: "English",
    pages: 592,
    dimensions: "6 x 1.8 x 9 inches",
    publicationDate: "March 3, 2020",
    age: "14+",
  };

  return (
    <div className="book-details">
      <div className="book-image">
        <img className="book-cover" src={BookImage} alt={book.title} />
      </div>

      <div className="book-info">
        <h2>{book.title}</h2>
        <p className="author">{book.author}</p>
        
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < book.rating ? "#FFD700" : "#ddd"} />
          ))}
          <span>{book.rating}</span>
        </div>

        <p className="price">{book.price}</p>
        <p className="description">{book.description}</p>

        <div className="quantity">
          <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
            <FaMinus />
          </button>
          <span className="quantity-number">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FaPlus />
          </button>
        </div>

        {/* Botones de acción */}
        <div className="buttons">
          <button className="add-to-cart">Add to cart</button>
          <button className="favorite">Favorite</button>
        </div>

        {/* Información adicional */}
        <div className="details">
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Publication date:</strong> {book.publicationDate}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Reading age:</strong> {book.age}</p>
          <p><strong>Print length:</strong> {book.pages} pages</p>
          <p><strong>Dimensions:</strong> {book.dimensions}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
