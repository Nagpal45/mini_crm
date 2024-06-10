import React, { useContext, useState } from 'react';
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
    <div className='font-figtree flex flex-col justify-start items-center w-1/2'>
      <h2 className='text-[30px] font-bold'>Add Customer</h2>
      <form onSubmit={handleSubmit} className='flex mt-[40px] ml-4 gap-[30px] flex-col w-[600px]'>
        <input
          name="name"
          placeholder="Name"
          value={customer.name}
          onChange={handleChange}
          className='border border-gray-400 p-2 rounded-md w-full h-[50px]'
        />
        <input
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          className='border border-gray-400 p-2 rounded-md w-full h-[50px]'
        />
        <input
          name="phone"
          placeholder="Phone"
          value={customer.phone}
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
        <button type="submit" className='bg-blue-200 w-5/6 self-center h-[50px] rounded-[50px]'>
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
