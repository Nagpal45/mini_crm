import axios from 'axios';

export const login = (email, password) => axios.post('/auth/login', { email, password });
export const getCustomerSize = (rules) => axios.post('/audience/check-size', { rules });
export const createAudience = (name, rules) => axios.post('/audience', { name, rules });
export const getAudiences = () => axios.get('/audience/all');
export const getCampaigns = () => axios.get('/campaign');
export const createCustomer = (customer) => axios.post('/data/customer', customer);
export const createOrder = (order) => axios.post('/data/order', order);
export const sendCampaign = (audienceId, message) => axios.post(`/campaign/${audienceId}`, { message });
export const logout = () => axios.get('/auth/logout');