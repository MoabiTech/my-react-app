import React, { useState } from 'react';

const StockManagement = ({ products, onUpdateStock }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('add');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !quantity || quantity <= 0) return;
    
    onUpdateStock(parseInt(selectedProduct), parseInt(quantity), action);
    
    // Reset form
    setSelectedProduct('');
    setQuantity('');
    setAction('add');
  };

  return (
    <div className="stock-management">
      <h1>Stock Management</h1>
      
      <div className="form-container">
        <h2>Update Stock</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Current: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            >
              <option value="add">Add Stock</option>
              <option value="deduct">Deduct Stock</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Update Stock
          </button>
        </form>
      </div>
      
      <div className="table-container">
        <h2>Current Stock Levels</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Current Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className={product.lowStockAlert ? 'low-stock' : 'healthy-stock'}>
                  {product.quantity}
                </td>
                <td>{product.lowStockAlert ? 'Low Stock' : 'In Stock'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;