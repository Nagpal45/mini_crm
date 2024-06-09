import React from 'react';
import CustomerForm from '../components/customerForm';
import OrderForm from '../components/orderForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <CustomerForm/>
      <OrderForm/>
    </div>
  );
};

export default Dashboard;
