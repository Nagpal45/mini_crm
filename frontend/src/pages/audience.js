import React from 'react';
import AudienceForm from '../components/audienceForm';
import AudienceList from '../components/audienceList';


const AudiencePage = () => {
  const [update, setUpdate] = React.useState(false);
  return (
    <div>
      <h1>Create Audience</h1>
      <AudienceForm setUpdate={setUpdate} />
      <AudienceList update={update}/>
    </div>
  );
};

export default AudiencePage;
