import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import "../styles/BookDetailsCard.css";
import BookImage from "../assets/book-cover-unavailable.svg"; 

const BookDetailsCard = () => {
  const { id } = useParams(); // Obtener ID del libro desde la URL
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del libro");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!book || book.stockStatus === 0) {
      window.alert("Este libro no está disponible para la compra.");
      return;
    }
  
    const cartItem = {
      bookId: book.idBook,
      quantity: quantity,
      unitPrice: book.price,
      addedDate: new Date().toISOString(), // Fecha actual en formato ISO
    };
  
    try {
      const response = await fetch("http://localhost:8090/api/carts/1/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
  
      if (!response.ok) {
        throw new Error("Error al añadir el libro al carrito");
      }
  
      // Mostrar alerta de éxito
      window.alert(`"${book.title}" se ha añadido al carrito correctamente.`);
    } catch (err) {
      // Mostrar alerta de error
      window.alert("Error al añadir el libro al carrito. Por favor, inténtalo de nuevo.");
    }
  };  

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-details">
      <div className="book-image">
        <img
          className="book-cover"
          src={BookImage}
          alt={book.title}
        />
      </div>

      <div className="book-info">
        <h2>{book.title}</h2>
        <p className="author">{book.publisherName}</p>

        {/* Calificación (Placeholder, ya que no está en la API) */}
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < 4 ? "#FFD700" : "#ddd"} />
          ))}
          <span>4.5</span> {/* Valor placeholder */}
        </div>

        <p className="price"><strong>Precio:</strong> US${book.price.toFixed(2)}</p>
        <p className="description"><strong>Descripción:</strong> {book.description}</p>

        {/* Selección de cantidad */}
        <div className="quantity">
          <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
            <FaMinus />
          </button>
          <span className="quantity-number">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FaPlus />
          </button>
        </div>

        {/* Botón de Añadir al Carrito */}
        <button 
          className="add-to-cart" 
          onClick={handleAddToCart} 
          disabled={book.stockStatus === 0}
        >
          {book.stockStatus === 0 ? "No disponible" : "Add to cart"}
        </button>

        {/* Mensaje de confirmación/error */}
        {cartMessage && <p className="cart-message">{cartMessage}</p>}

        {/* Información adicional */}
        <div className="details">
          <p><strong>Editorial:</strong> {book.publisherName}</p>
          <p><strong>Fecha de Publicación:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
          <p><strong>Idioma:</strong> {book.language}</p>
          <p><strong>Número de páginas:</strong> {book.numberOfPages}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p className={book.stockStatus > 0 ? "available" : "not-available"}>
            {book.stockStatus > 0 ? "Disponible" : "No disponible"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
