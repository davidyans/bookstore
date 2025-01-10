import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";
import { FaChevronRight } from "react-icons/fa";

const OrderTable = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} onClick={() => navigate(`/orders/${order.id}`)} className="clickable-row">
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>
                {order.total} <FaChevronRight className="icon-arrow" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
