import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import { getAudiences } from '../utils/api';

const AudienceList = ({update}) => {
  const { user } = useContext(AuthContext);
  const [audiences, setAudiences] = useState([]);

  const handleCampaign = (audienceId) => {
    window.location.href = `/campaigns?audienceId=${audienceId}`;
  };

  useEffect(() => {
    const fetchAudiences = async () => {
      if (user) {
        const response = await getAudiences(user._id);
        setAudiences(response.data);
      }
    };
    fetchAudiences();
  }, [update]);

  return (
    <div>
      <h2>Audiences</h2>
      {audiences.map((audience) => (
        <div key={audience._id}>
          <p>{audience.name}</p>
          <p>Size: {
            audience.customers.length > 0
              ? audience.customers.length
              : 'No customers found'
          }</p>
          <button onClick={() => handleCampaign(audience._id)}>Create campaign</button>
        </div>
      ))}
    </div>
  );
};

export default AudienceList;
