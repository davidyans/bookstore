import "../styles/Footer.css";
import { FaInstagram, FaGoogle, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Gallery</a>
          <a href="#">Team</a>
        </div>
        <div className="subscribe">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sales and Refunds</a>
          <a href="#">Legal</a>
        </div>
        <div className="social-icons">
          <FaInstagram />
          <FaGoogle />
          <FaFacebook />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
