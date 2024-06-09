import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CampaignList from '../components/campaignList';
import { sendCampaign } from '../utils/api';

const CampaignPage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const audienceId = queryParams.get('audienceId');

  const handleSendCampaign = async () => {
    try {
      const response = await sendCampaign(audienceId, message);
      console.log('Campaign sent:', response.data);
      window.location.href = '/campaigns';
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  return (
    <div>
      {
      audienceId ? (
        <div>
      <h2>Create Campaign</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your campaign message"
      ></textarea>
      <button onClick={handleSendCampaign}>Send Campaign</button>
    </div >
      ) :
      <CampaignList />
    }
    </div>
  );
};

export default CampaignPage;
