import "../styles/OrderDetails.css";

const OrderSummary = ({ total, status, onCancel }) => {
  return (
    <div className="order-summary">
      <h3>Total: <strong>US${total}</strong></h3>
      <p><strong>Estado:</strong> {status}</p>
      {status === "Pendiente" && (
        <button className="cancel-button" onClick={onCancel}>Cancel order</button>
      )}
    </div>
  );
};

export default OrderSummary;
    