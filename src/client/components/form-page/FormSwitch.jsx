import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const isBoolean = val => typeof val === 'boolean';
const getBoolean = val => val === 'SI';

export default function FormSwitch({
  name,
  label,
  values,
  isSubmitting,
  handleChange,
}) {
  const value = values[name];
  return (
    <FormGroup>
      <FormControlLabel
        disabled={isSubmitting}
        control={
          <Switch
            checked={isBoolean(value) ? value : getBoolean(value)}
            onChange={handleChange}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
