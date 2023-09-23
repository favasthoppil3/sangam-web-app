import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CurrentDate = () => {
  const [date, setDate] = useState(new Date());
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
  };

  return <TextField value={`${formattedDate} `} variant="outlined" fullWidth onChange={handleDateChange} />;
};

export default CurrentDate;
