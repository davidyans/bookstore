import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Orders.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL"); // Filtro de estado
  const [dateFilter, setDateFilter] = useState("ALL"); // Filtro de periodo
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/orders");
        if (!response.ok) {
          throw new Error("Error al obtener los pedidos.");
        }
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data); // Mostrar todas las órdenes al inicio
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Lógica de filtrado
  useEffect(() => {
    const now = new Date();
    let filtered = orders;

    // Filtrar por estado
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filtrar por periodo
    if (dateFilter !== "ALL") {
      const filterDate = new Date();
      if (dateFilter === "3M") filterDate.setMonth(filterDate.getMonth() - 3);
      if (dateFilter === "6M") filterDate.setMonth(filterDate.getMonth() - 6);
      if (dateFilter === "1Y") filterDate.setFullYear(filterDate.getFullYear() - 1);

      filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
    }

    setFilteredOrders(filtered);
  }, [statusFilter, dateFilter, orders]);

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <main className="orders-container">
        <h2>Your Orders</h2>
        <div className="orders-filters">
          <p><strong>{filteredOrders.length} pedidos</strong> realizados</p>
          
          {/* Dropdown de Estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="COMPLETED">Completados</option>
            <option value="CREATED">Creados</option>
            <option value="CANCELLED">Cancelados</option>
          </select>

          {/* Dropdown de Periodo */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="ALL">Todo el Tiempo</option>
            <option value="3M">Últimos 3 meses</option>
            <option value="6M">Últimos 6 meses</option>
            <option value="1Y">Último año</option>
          </select>
        </div>

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
              {filteredOrders.map((order) => (
                <tr
                  key={order.orderId}
                  onClick={() => navigate(`/orders/${order.orderId}`)}
                  className="clickable-row"
                >
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>US$ {order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
