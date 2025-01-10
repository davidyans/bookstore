import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderFilters from "../components/OrderFilters";
import OrderTable from "../components/OrderTable";
import "../styles/Orders.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    { id: 1, date: "23/12/2023", status: "Pendiente", total: "US$170,7" },
    { id: 2, date: "23/01/2024", status: "Pendiente", total: "US$170,7" },
    { id: 3, date: "23/02/2024", status: "Pendiente", total: "US$170,7" },
    { id: 4, date: "13/02/2024", status: "Pendiente", total: "US$170,7" },
    { id: 5, date: "23/01/2024", status: "Completado", total: "US$170,7" },
    { id: 6, date: "15/01/2024", status: "Cancelado", total: "US$170,7" },
  ]);

  return (
    <div>
      <Header />
      <main className="orders-container">
        <h2>Your orders</h2>
        <p><strong>{orders.length} pedidos</strong> realizados</p>
        <OrderFilters setFilterDate={() => {}} setFilterStatus={() => {}} />
        <OrderTable orders={orders} />
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
