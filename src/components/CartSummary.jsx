import "../styles/Cart.css";

const CartSummary = () => {
  return (
    <div className="cart-summary">
      <h3>Total: <strong>US$XXX.XX</strong></h3>
      <p>(X artículos)</p>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default CartSummary;
