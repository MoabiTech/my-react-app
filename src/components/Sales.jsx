import React, { useState } from 'react';

const Sales = ({ products, onAddSale, sales }) => {
  const [saleItems, setSaleItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');

  const addItemToSale = () => {
    if (!selectedProduct || quantity <= 0) return;
    
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;
    
    // Check if product is already in the sale
    const existingItemIndex = saleItems.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      const updatedItems = [...saleItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setSaleItems(updatedItems);
    } else {
      // Add new item
      setSaleItems([...saleItems, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      }]);
    }
    
    // Reset form
    setSelectedProduct('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    const updatedItems = [...saleItems];
    updatedItems.splice(index, 1);
    setSaleItems(updatedItems);
  };

  const completeSale = () => {
    if (saleItems.length === 0 || !customerName) return;
    
    const totalAmount = saleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    onAddSale({
      customerName,
      items: saleItems,
      totalAmount
    });
    
    // Reset form
    setSaleItems([]);
    setCustomerName('');
  };

  const getTotal = () => {
    return saleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="sales">
      <h1>Sales</h1>
      
      <div className="form-container">
        <h2>New Sale</h2>
        
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Select Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {products.filter(p => p.quantity > 0).map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (M{product.price}, Stock: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={addItemToSale}
          >
            Add Item
          </button>
        </div>
        
        {saleItems.length > 0 && (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>M{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>M{(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn btn-danger"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                    <td colSpan="2" style={{ fontWeight: 'bold' }}>M{getTotal().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <button 
              className="btn btn-success"
              onClick={completeSale}
              style={{ marginTop: '15px' }}
            >
              Complete Sale
            </button>
          </>
        )}
      </div>
      
      <div className="table-container">
        <h2>Sales History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.customerName}</td>
                <td>
                  {sale.items.map(item => (
                    <div key={item.productId}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>M{sale.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;