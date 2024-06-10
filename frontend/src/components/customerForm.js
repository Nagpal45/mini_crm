import React, { useContext, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { createCustomer } from '../utils/api';
import { AuthContext } from '../utils/context';

const CustomerForm = () => {
  const { user } = useContext(AuthContext);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); 
    try {
      await createCustomer({ ...customer, userId: user._id });
      alert('Customer added successfully');
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
        value={customer.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={customer.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        name="phone"
        label="Phone"
        value={customer.phone}
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
        Add Customer
      </Button>
    </form>
  );
};

export default CustomerForm;
