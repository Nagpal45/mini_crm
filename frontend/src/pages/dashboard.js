import React, { useContext } from 'react';
import CustomerForm from '../components/customerForm';
import OrderForm from '../components/orderForm';
import { AuthContext } from '../utils/context'

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleBulkCustomers = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const customers = generateBulkCustomers(500, user._id);
    await sendBulkDataToServer('https://mini-crm-hnpl.onrender.com/data/customer', customers);
  };

  const handleBulkOrders = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const customerIds = await fetchCustomerIds();
    const orders = generateBulkOrders(500, customerIds); 
    await sendBulkDataToServer('https://mini-crm-hnpl.onrender.com/data/order', orders);
  };

  const generateBulkCustomers = (count, userId) => {
    const customers = [];
    for (let i = 0; i < count; i++) {
      customers.push({
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `123456789${i}`,
        userId: userId, 
      });
    }
    return customers;
  };

  const generateBulkOrders = (count, customerIds) => {
    const orders = [];
    for (let i = 0; i < count; i++) {
      const randomCustomerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      orders.push({
        customerId: randomCustomerId,
        product: `Product ${i + 1}`,
        amount: (i + 1) * 10,
        date: new Date().toISOString(),
      });
    }
    return orders;
  };

  const sendBulkDataToServer = async (url, data) => {
    for (let item of data) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    }
    alert('Data added successfully');
  };

  const fetchCustomerIds = async () => {
    try {
      const response = await fetch('/data/customers/ids');
      const customerIds = await response.json();
      return customerIds;
    } catch (error) {
      console.error('Error fetching customer IDs:', error);
      return [];
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className='flex flex-row pt-[30px]'>
        <CustomerForm />
        <OrderForm />
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-[90px] gap-[30px]">
        <button
          className='w-1/2 rounded-[50px] bg-green-200 h-[50px]'
          onClick={handleBulkCustomers}
        >
          Add Customers Bulk
        </button>
        <button
          className='w-1/2 rounded-[50px] bg-green-200 h-[50px]'
          onClick={handleBulkOrders}
        >
          Add Orders Bulk
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
