import "../styles/Cart.css";

const CartSummary = ({ total, itemCount, checkout, isCartEmpty }) => {
  return (
    <div className="cart-summary">
      <h3>Total: <strong>US${total.toFixed(2)}</strong></h3>
      <p>({itemCount} artículos)</p>
      <button 
        className="checkout-btn" 
        onClick={checkout} 
        disabled={isCartEmpty}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
