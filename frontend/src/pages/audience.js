import React from 'react';
import AudienceForm from '../components/audienceForm';
import AudienceList from '../components/audienceList';


const AudiencePage = () => {
  const [update, setUpdate] = React.useState(false);
  return (
    <div className='flex flex-row w-full pt-[20px] pb-[30px]'>
      <AudienceForm setUpdate={setUpdate} />
      <AudienceList update={update}/>
    </div>
  );
};

export default AudiencePage;
