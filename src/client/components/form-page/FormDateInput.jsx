import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FormDateInput({ values, setFieldValue, label, name }) {
  function handleChange(newValue) {
    setFieldValue(name, newValue);
  }
  return (
    <DatePicker
      label={label}
      value={values[name]}
      onChange={handleChange}
      renderInput={params => <TextField fullWidth {...params} />}
    />
  );
}
