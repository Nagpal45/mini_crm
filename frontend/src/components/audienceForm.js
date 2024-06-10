import React, { useContext, useState } from 'react';
import { createAudience, getCustomerSize } from '../utils/api';
import { AuthContext } from '../utils/context';

const AudienceForm = ({ setUpdate }) => {
  const [name, setName] = useState('');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
  const [size, setSize] = useState(null);
  const { user } = useContext(AuthContext);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newRules = [...rules];
    newRules[index][name] = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const handleSizeCheck = async () => {
    const response = await getCustomerSize(rules, user._id);
    setSize(response.data.size);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAudience(name, rules, user._id);
    alert('Audience created successfully');
    setUpdate((prev) => !prev);
  };

  return (
    <div className="flex w-1/2 flex-col pl-[30px]">
      <h1 className='text-[30px] font-bold'>Create Audience</h1>
      <form onSubmit={handleSubmit} className='flex flex-col mt-[10px] w-5/6' >
        <input className='border border-black mt-[10px] w-full p-2' label="Audience Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Audience Name' />
        {rules.map((rule, index) => (
          <div key={index} className='flex flex-col'>
            <label className='text-[18px] font-semibold mt-[30px]'>Select Parameter</label>
            <select className='border border-black mt-[10px] w-full p-2' name="field" value={rule.field} onChange={(e) => handleChange(index, e)} >
            <option value="" disabled className='text-gray'>Select Parameter</option>
              <option value="totalSpends">Total Spends</option>
              <option value="maxVisits">Max Visits</option>
              <option value="lastVisit">Last Visit</option>
            </select>
            <label className='text-[18px] font-semibold mt-[30px]'>Select Operator</label>
            <select className='border border-black mt-[10px] w-full p-2' name="operator" value={rule.operator} onChange={(e) => handleChange(index, e)} >
            <option value="" disabled className='text-gray'>Select Operator</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
              {rule.field === 'lastVisit' && <option value="not_visited_last">Not Visited Last</option>}
            </select>
            <label className='text-[18px] font-semibold mt-[30px]'>Enter Value</label>
            <input name="value" label="Value" value={rule.value} onChange={(e) => handleChange(index, e)} className='border border-black mt-[10px] w-full p-2' />
          </div>
        ))}
        <button type="button" className='w-full self-center h-[40px] rounded-full bg-blue-200 mt-[40px]' onClick={addRule}>Add Rule</button>
        <div className="flex flex-row gap-[20px]">
        <button type="button" className='w-2/3 self-center h-[40px] rounded-full bg-blue-200 mt-[20px]' onClick={handleSizeCheck}>Check Audience Size</button>
        <button className='w-2/3 self-center h-[40px] rounded-full bg-blue-200 mt-[20px]' type="submit" variant="contained" color="primary">Create Audience</button>
        </div>
        {size !== null && <p className='text-[24px] mt-[20px] ml-[10px] font-semibold'>Audience Size: {size}</p>}
      </form>
    </div>
  );
};

export default AudienceForm;
