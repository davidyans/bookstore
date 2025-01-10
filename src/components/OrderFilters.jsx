import "../styles/Orders.css";

const OrderFilters = ({ setFilterDate, setFilterStatus }) => {
  return (
    <div className="order-filters">
      {/* Filtro por rango de fecha */}
      <select onChange={(e) => setFilterDate(e.target.value)} className="filter-dropdown">
        <option value="3months">Últimos 3 meses</option>
        <option value="4months">Últimos 4 meses</option>
        <option value="5months">Últimos 5 meses</option>
        <option value="6months">Últimos 6 meses</option>
        <option value="1year">Último año</option>
      </select>

      {/* Filtro por estado */}
      <select onChange={(e) => setFilterStatus(e.target.value)} className="filter-dropdown">
        <option value="pending">Pendientes</option>
        <option value="completed">Completados</option>
        <option value="canceled">Cancelados</option>
      </select>
    </div>
  );
};

export default OrderFilters;
