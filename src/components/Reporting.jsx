import React, { useState } from 'react';

const Reporting = ({ products, sales, customers }) => {
  const [reportType, setReportType] = useState('sales');

  // Calculate sales report data
  const salesByDate = sales.reduce((acc, sale) => {
    if (!acc[sale.date]) {
      acc[sale.date] = 0;
    }
    acc[sale.date] += sale.totalAmount;
    return acc;
  }, {});

  const salesByProduct = sales.reduce((acc, sale) => {
    sale.items.forEach(item => {
      if (!acc[item.name]) {
        acc[item.name] = { quantity: 0, revenue: 0 };
      }
      acc[item.name].quantity += item.quantity;
      acc[item.name].revenue += item.price * item.quantity;
    });
    return acc;
  }, {});

  // Calculate inventory report data
  const inventoryValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockCount = products.filter(p => p.lowStockAlert).length;

  const renderReport = () => {
    switch(reportType) {
      case 'sales':
        return (
          <div className="sales-report">
            <h2>Sales Report</h2>
            
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <div className="value">{sales.length}</div>
              </div>
              
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <div className="value">
                  M{sales.reduce((sum, sale) => sum + sale.totalAmount, 0).toFixed(2)}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Average Sale Value</h3>
                <div className="value">
                  M{sales.length > 0 ? (sales.reduce((sum, sale) => sum + sale.totalAmount, 0) / sales.length).toFixed(2) : '0.00'}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Total Customers</h3>
                <div className="value">{customers.length}</div>
              </div>
            </div>
            
            <div className="sales-breakdown">
              <h3>Sales by Date</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(salesByDate).map(([date, amount]) => (
                      <tr key={date}>
                        <td>{date}</td>
                        <td>M{amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="product-performance">
              <h3>Product Performance</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity Sold</th>
                      <th>Revenue Generated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(salesByProduct).map(([product, data]) => (
                      <tr key={product}>
                        <td>{product}</td>
                        <td>{data.quantity}</td>
                        <td>M{data.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'inventory':
        return (
          <div className="inventory-report">
            <h2>Inventory Report</h2>
            
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Products</h3>
                <div className="value">{products.length}</div>
              </div>
              
              <div className="stat-card">
                <h3>Total Inventory Value</h3>
                <div className="value">M{inventoryValue.toFixed(2)}</div>
              </div>
              
              <div className="stat-card">
                <h3>Low Stock Items</h3>
                <div className="value">{lowStockCount}</div>
              </div>
              
              <div className="stat-card">
                <h3>Out of Stock Items</h3>
                <div className="value">
                  {products.filter(p => p.quantity === 0).length}
                </div>
              </div>
            </div>
            
            <div className="inventory-breakdown">
              <h3>Inventory by Category</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Number of Products</th>
                      <th>Total Quantity</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...new Set(products.map(p => p.category))].map(category => {
                      const categoryProducts = products.filter(p => p.category === category);
                      const totalQuantity = categoryProducts.reduce((sum, p) => sum + p.quantity, 0);
                      const totalValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
                      
                      return (
                        <tr key={category}>
                          <td>{category}</td>
                          <td>{categoryProducts.length}</td>
                          <td>{totalQuantity}</td>
                          <td>M{totalValue.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="low-stock-report">
              <h3>Low Stock Report</h3>
              {lowStockCount > 0 ? (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Current Quantity</th>
                        <th>Price</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(p => p.lowStockAlert).map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td className="low-stock">{product.quantity}</td>
                          <td>M{product.price}</td>
                          <td>M{(product.price * product.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No low stock items to report.</p>
              )}
            </div>
          </div>
        );
      
      default:
        return <div>Select a report type</div>;
    }
  };

  return (
    <div className="reporting">
      <h1>Reporting</h1>
      
      <div className="report-selector">
        <button 
          className={`btn M{reportType === 'sales' ? 'btn-primary' : ''}`}
          onClick={() => setReportType('sales')}
        >
          Sales Reports
        </button>
        <button 
          className={`btn M{reportType === 'inventory' ? 'btn-primary' : ''}`}
          onClick={() => setReportType('inventory')}
        >
          Inventory Reports
        </button>
      </div>
      
      {renderReport()}
    </div>
  );
};

export default Reporting;