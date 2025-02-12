import { FaSearch, FaBell, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Logo from "../assets/Logo.png"; 

const Header = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart/1"); // Redirige al carrito con ID 1
  }

  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Book Shop Logo" />
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="What are you looking for ?" />
      </div>

      <div className="icons">
        <FaBell className="icon" />
        <FaUser className="icon" />
        <FaHeart className="icon" />
        <button className="cart-button" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
          <span>Cart</span>
        </button>
      </div>
    </header>
  );
};

export default Header;