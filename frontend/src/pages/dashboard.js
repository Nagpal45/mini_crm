import React from 'react';
import CustomerForm from '../components/customerForm';
import OrderForm from '../components/orderForm';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className='flex flex-row pt-[50px]'>
        <CustomerForm/>
        <OrderForm/>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-[80px] gap-[30px]">
        <button className='w-1/2 rounded-[50px] bg-green-200 h-[50px]'>Add Customers Bulk</button>
        <button className='w-1/2 rounded-[50px] bg-green-200 h-[50px]'>Add Orders Bulk</button>
      </div>
    </div>
  );
};

export default Dashboard;
