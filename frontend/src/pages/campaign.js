import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CampaignList from '../components/campaignList';
import { sendCampaign } from '../utils/api';

const CampaignPage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const audienceId = queryParams.get('a');

  const handleSendCampaign = async () => {
    try {
      await sendCampaign(audienceId, message);
      window.location.href = '/campaigns';
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  return (
    <div className='w-full  px-[30px] py-[30px]'>
      {
      audienceId ? (
        <>
        <div className='flex w-11/12 flex-col mb-[80px]'>
      <h2 className='text-[30px] font-bold mb-[20px]'>Create Campaign</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your campaign message"
        className='border border-black p-4 rounded-[10px] mb-[20px] w-full h-[200px] text-[18px]'
      ></textarea>
      <button className='bg-blue-200 w-5/6 self-center h-[50px] rounded-full' onClick={handleSendCampaign}>Send Campaign</button>
    </div>
      <CampaignList />
      </>
      ) :
      <CampaignList />
    }
    </div>
  );
};

export default CampaignPage;
