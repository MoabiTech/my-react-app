import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import StockManagement from './components/StockManagement';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Customer from './components/Customer';
import Reporting from './components/Reporting';
import './App.css';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedSales = localStorage.getItem('sales');
    const savedCustomers = localStorage.getItem('customers');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      lowStockAlert: product.quantity <= 5
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? {...updatedProduct, id, lowStockAlert: updatedProduct.quantity <= 5} : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateStock = (id, quantityChange, type) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = type === 'add' 
          ? product.quantity + quantityChange 
          : product.quantity - quantityChange;
        
        return {
          ...product,
          quantity: newQuantity,
          lowStockAlert: newQuantity <= 5
        };
      }
      return product;
    }));
  };

  const addSale = (sale) => {
    const newSale = {
      ...sale,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    setSales([...sales, newSale]);
    
    // Update product quantities
    sale.items.forEach(item => {
      updateStock(item.productId, item.quantity, 'deduct');
    });
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now()
    };
    setCustomers([...customers, newCustomer]);
  };

  const renderModule = () => {
    switch(activeModule) {
      case 'dashboard':
        return <Dashboard products={products} sales={sales} />;
      case 'products':
        return (
          <ProductManagement 
            products={products} 
            onAddProduct={addProduct} 
            onUpdateProduct={updateProduct} 
            onDeleteProduct={deleteProduct} 
          />
        );
      case 'stock':
        return <StockManagement products={products} onUpdateStock={updateStock} />;
      case 'sales':
        return <Sales products={products} onAddSale={addSale} sales={sales} />;
      case 'inventory':
        return <Inventory products={products} />;
      case 'customers':
        return <Customer customers={customers} onAddCustomer={addCustomer} />;
      case 'reporting':
        return <Reporting products={products} sales={sales} customers={customers} />;
      default:
        return <Dashboard products={products} sales={sales} />;
    }
  };

  return (
    <div className="app">
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="main-content">
        {renderModule()}
      </div>
    </div>
  );
}

export default App;