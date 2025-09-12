import React from 'react';

const Dashboard = ({ products, sales }) => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter(product => product.lowStockAlert).length;
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((total, sale) => total + sale.totalAmount, 0);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="value">{totalProducts}</div>
        </div>
        
        <div className="stat-card">
          <h3>Low Stock Products</h3>
          <div className="value">{lowStockProducts}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Sales</h3>
          <div className="value">{totalSales}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="value">M{totalRevenue.toFixed(2)}</div>
        </div>
      </div>
      
      {lowStockProducts > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alert</h3>
          <p>You have {lowStockProducts} product(s) with low stock. Please restock soon.</p>
        </div>
      )}
      
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        {/* You can add recent activities here */}
      </div>
    </div>
  );
};

export default Dashboard;