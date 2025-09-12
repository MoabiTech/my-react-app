import React from 'react';

const Navigation = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Product Management' },
    { id: 'stock', label: 'Stock Management' },
    { id: 'sales', label: 'Sales' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'customers', label: 'Customers' },
    { id: 'reporting', label: 'Reporting' }
  ];

  return (
    <div className="navigation">
      <h2>Wings Cafe</h2>
      {modules.map(module => (
        <div 
          key={module.id}
          className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
          onClick={() => setActiveModule(module.id)}
        >
          {module.label}
        </div>
      ))}
    </div>
  );
};

export default Navigation;