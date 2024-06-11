import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import { getAudiences } from '../utils/api';

const AudienceList = ({update}) => {
  const { user } = useContext(AuthContext);
  const [audiences, setAudiences] = useState([]);

  const handleCampaign = (audienceId) => {
    window.location.href = `/campaigns?a=${audienceId}`;
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
    <div className='w-1/2'>
      <h2 className='text-[30px] font-bold mb-[20px]'>Your Audiences</h2>
      {audiences?.map((audience) => (
        <div key={audience._id} className='flex flex-row w-11/12 justify-between items-center py-2 pl-4 pr-8 bg-green-100 mt-[20px] rounded-[10px] font-semibold'>
          <div className="flex flex-col justify-center items-start">
          <p className='text-[20px]'>{audience.name}</p>
          <p className='text-[16px] mt-[5px] text-gray-500'>Size: {
            audience.customers.length > 0
              ? audience.customers.length
              : 'No customers found'
          }</p>
          </div>
          <button className='text-[14px] bg-green-300 px-4 py-2 rounded-full' onClick={() => handleCampaign(audience._id)}>Create campaign</button>
        </div>
      ))}
    </div>
  );
};

export default AudienceList;
