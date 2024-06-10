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
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2>Campaigns</h2>
      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <p>{campaign.message}</p>
          <p>Status: {campaign.status}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
