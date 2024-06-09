import React, { useEffect, useState } from 'react';
import { getCampaigns } from '../utils/api';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await getCampaigns();
      setCampaigns(response.data);
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
