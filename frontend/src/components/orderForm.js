import React, { useState } from 'react';
import { createOrder } from '../utils/api';

const OrderForm = () => {
  const [order, setOrder] = useState({
    customerId: '',
    product: '',
    amount: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await createOrder(order);
      alert('Order added successfully');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: 'Something went wrong. Please try again.' }]);
      }
    }
  };

  return (
    <div className='font-figtree flex flex-col justify-start items-center w-1/2'>
      <h2 className='text-[30px] font-bold'>Add Order</h2>
    <form onSubmit={handleSubmit} className='flex mt-[40px] ml-4 gap-[30px] flex-col w-[600px]'>
      <input
        name="CustomerId"
        placeholder="CustomerId"
        value={order.customerId}
        onChange={handleChange}
        className='border border-gray-400 p-2 rounded-md w-full h-[50px]'
      />
      <input
        name="product"
        placeholder="Product"
        value={order.product}
        onChange={handleChange}
        className='border border-gray-400 p-2 rounded-md w-full h-[50px]'
      />
      <input
        name="amount"
        placeholder="Amount"
        value={order.amount}
        onChange={handleChange}
        className='border border-gray-400 p-2 rounded-md w-full h-[50px]'
      />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <div key={index} className='text-red-500'>
                {"** " + error.msg}
            </div>
          ))}
        </div>
      )}
      <button type="submit" className='bg-blue-200 w-5/6 rounded-[50px] h-[50px] self-center'>
        Add Order
      </button>
    </form>
  </div>
  );
};

export default OrderForm;