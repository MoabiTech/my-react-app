import React, { useState } from 'react';
import ProductForm from './ProductForm';

const ProductManagement = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="product-management">
      <h1>Product Management</h1>
      
      {!showForm ? (
        <>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
          >
            Add New Product
          </button>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>M{product.price}</td>
                    <td className={product.lowStockAlert ? 'low-stock' : 'healthy-stock'}>
                      {product.quantity}
                    </td>
                    <td>{product.lowStockAlert ? 'Low Stock' : 'In Stock'}</td>
                    <td className="action-buttons">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <ProductForm 
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProductManagement;