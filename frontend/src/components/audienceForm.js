import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { createAudience, getCustomerSize } from '../utils/api';

const AudienceForm = ({setUpdate}) => {
  const [name, setName] = useState('');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
  const [size, setSize] = useState(null);

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
    const response = await getCustomerSize(rules);
    setSize(response.data.size);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAudience(name, rules);
    alert('Audience created successfully');
    setUpdate((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Audience Name" value={name} onChange={(e) => setName(e.target.value)} required />
      {rules.map((rule, index) => (
        <div key={index}>
          <FormControl>
            <InputLabel>Field</InputLabel>
            <Select name="field" value={rule.field} onChange={(e) => handleChange(index, e)} required>
              <MenuItem value="totalSpends">Total Spends</MenuItem>
              <MenuItem value="maxVisits">Max Visits</MenuItem>
              <MenuItem value="lastVisit">Last Visit</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Operator</InputLabel>
            <Select name="operator" value={rule.operator} onChange={(e) => handleChange(index, e)} required>
              <MenuItem value=">">&gt;</MenuItem>
              <MenuItem value=">=">&gt;=</MenuItem>
              <MenuItem value="<">&lt;</MenuItem>
              <MenuItem value="<=">&lt;=</MenuItem>
              <MenuItem value="==">==</MenuItem>
              <MenuItem value="!=">!=</MenuItem>
              {rule.field === 'lastVisit' && <MenuItem value="not_visited_last">Not Visited Last</MenuItem>}
            </Select>
          </FormControl>
          <TextField name="value" label="Value" value={rule.value} onChange={(e) => handleChange(index, e)} required />
        </div>
      ))}
      <Button type="button" onClick={addRule}>Add Rule</Button>
      <Button type="button" onClick={handleSizeCheck}>Check Audience Size</Button>
      {size !== null && <p>Audience Size: {size}</p>}
      <Button type="submit" variant="contained" color="primary">Create Audience</Button>
    </form>
  );
};

export default AudienceForm;
