import axios from 'axios';

export const login = (email, password) => axios.post('/auth/login', { email, password });
export const getCustomerSize = (rules) => axios.post('/audience/check-size', { rules });
export const createAudience = (name, rules) => axios.post('/audience', { name, rules });
export const getAudiences = () => axios.get('/audience');
export const sendCampaign = (audienceId) => axios.post(`/campaign/${audienceId}`);
export const getCampaigns = () => axios.get('/campaign');