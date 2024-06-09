import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { createCustomer } from '../services/api';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    totalSpends: 0,
    maxVisits: 0,
    lastVisit: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer(customer);
    alert('Customer added successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" value={customer.name} onChange={handleChange} required />
      <TextField name="email" label="Email" value={customer.email} onChange={handleChange} required />
      <TextField name="phone" label="Phone" value={customer.phone} onChange={handleChange} required />
      <TextField name="totalSpends" label="Total Spends" type="number" value={customer.totalSpends} onChange={handleChange} required />
      <TextField name="maxVisits" label="Max Visits" type="number" value={customer.maxVisits} onChange={handleChange} required />
      <TextField name="lastVisit" label="Last Visit" type="date" value={customer.lastVisit} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary">Add Customer</Button>
    </form>
  );
};

export default CustomerForm;
