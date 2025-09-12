import React, { useState } from 'react';

const Customer = ({ customers, onAddCustomer }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAddCustomer({
      name,
      email,
      phone
    });
    
    // Reset form and hide it
    setName('');
    setEmail('');
    setPhone('');
    setShowForm(false);
  };

  return (
    <div className="customer">
      <h1>Customer Management</h1>
      
      {!showForm ? (
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(true)}
        >
          Add New Customer
        </button>
      ) : (
        <div className="form-container">
          <h2>Add New Customer</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="action-buttons">
              <button type="submit" className="btn btn-primary">
                Add Customer
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="table-container">
        <h2>Customer List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email || 'N/A'}</td>
                <td>{customer.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;