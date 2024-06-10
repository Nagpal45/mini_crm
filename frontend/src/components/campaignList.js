import React, { useContext, useEffect, useState } from 'react';
import { getCampaigns } from '../utils/api';
import { AuthContext } from '../utils/context';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if(user) {
        const response = await getCampaigns(user._id);
        setCampaigns(response.data);
        console.log(response.data)
      }
    };
    fetchCampaigns();
  }, [user]);

  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-[30px] font-bold'>Your Campaigns</h2>
      <div className="flex flex-row w-full flex-wrap">
      {campaigns.map((campaign) => (
        <div key={campaign._id} className={`flex flex-col justify-center items-center w-[450px] items-center p-4 border border-[2px] mt-[30px] rounded-[10px] font-semibold ${campaign.status === 'SENT' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'} gap-[15px] mr-[30px]`}>
            <div className="flex flex-row justify-between items-center w-full">
              <p className='text-gray-500'>Message</p>
              <p className='text-[20px]'>{campaign.message}</p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <p className='text-gray-500'>Audience</p>
              <p className='text-[20px]'>{campaign.audienceName}</p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <p className='text-gray-500'>Status</p>
              <p className='text-[20px]'>{campaign.status}</p>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CampaignList;
