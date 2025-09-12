import React from 'react';

const Inventory = ({ products }) => {
  const categories = [...new Set(products.map(product => product.category))];
  
  const getCategoryStats = (category) => {
    const categoryProducts = products.filter(p => p.category === category);
    const totalItems = categoryProducts.reduce((sum, product) => sum + product.quantity, 0);
    const totalValue = categoryProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const lowStockItems = categoryProducts.filter(p => p.lowStockAlert).length;
    
    return { totalItems, totalValue, lowStockItems };
  };

  return (
    <div className="inventory">
      <h1>Inventory Overview</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="value">{products.length}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Items in Stock</h3>
          <div className="value">
            {products.reduce((sum, product) => sum + product.quantity, 0)}
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <div className="value">
            M{products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <div className="value">
            {products.filter(p => p.lowStockAlert).length}
          </div>
        </div>
      </div>
      
      <div className="category-breakdown">
        <h2>Category Breakdown</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Number of Products</th>
                <th>Total Items</th>
                <th>Total Value</th>
                <th>Low Stock Items</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => {
                const stats = getCategoryStats(category);
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{products.filter(p => p.category === category).length}</td>
                    <td>{stats.totalItems}</td>
                    <td>M{stats.totalValue.toFixed(2)}</td>
                    <td className={stats.lowStockItems > 0 ? 'low-stock' : ''}>
                      {stats.lowStockItems}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="low-stock-items">
        <h2>Low Stock Items</h2>
        {products.filter(p => p.lowStockAlert).length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Current Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.lowStockAlert).map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className="low-stock">{product.quantity}</td>
                    <td>M{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No low stock items. All products are sufficiently stocked.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;