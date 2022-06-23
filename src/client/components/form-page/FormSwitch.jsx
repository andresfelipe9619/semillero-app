import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const isBoolean = val => typeof val === 'boolean';
const getBoolean = val => val === 'SI';
const getLiteral = val => (val ? 'SI' : 'NO');
const isChecked = val => (isBoolean(val) ? val : getBoolean(val));

export default function FormSwitch({
  name,
  label,
  values,
  setFieldValue,
  isSubmitting,
}) {
  const value = values[name] || 'NO';

  function handleChange(event) {
    const { checked } = event.target;
    setFieldValue(name, getLiteral(checked));
  }

  return (
    <FormGroup>
      <FormControlLabel
        disabled={isSubmitting}
        control={<Switch checked={isChecked(value)} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
}
