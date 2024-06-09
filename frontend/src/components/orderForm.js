import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
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
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={order.customerId}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        name="product"
        label="Product"
        value={order.product}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        name="amount"
        label="Amount"
        value={order.amount}
        onChange={handleChange}
        margin="normal"
      />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <Typography key={index} color="error">
              {error.msg}
            </Typography>
          ))}
        </div>
      )}
      <Button type="submit" variant="contained" color="primary">
        Add Order
      </Button>
    </form>
  );
};

export default OrderForm;