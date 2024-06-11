import axios from 'axios';

export const login = (email, password) => axios.post('https://mini-crm-hnpl.onrender.com/auth/login', { email, password });
export const getCustomerSize = (rules) => axios.post('https://mini-crm-hnpl.onrender.com/audience/check-size', { rules });
export const createAudience = (name, rules) => axios.post('https://mini-crm-hnpl.onrender.com/audience', { name, rules });
export const getAudiences = () => axios.get('https://mini-crm-hnpl.onrender.com/audience/all');
export const getCampaigns = () => axios.get('https://mini-crm-hnpl.onrender.com/campaign');
export const createCustomer = (customer) => axios.post('https://mini-crm-hnpl.onrender.com/data/customer', customer);
export const createOrder = (order) => axios.post('https://mini-crm-hnpl.onrender.com/data/order', order);
export const sendCampaign = (audienceId, message) => axios.post(`https://mini-crm-hnpl.onrender.com/campaign/${audienceId}`, { message });
export const logout = () => axios.get('https://mini-crm-hnpl.onrender.com/auth/logout');