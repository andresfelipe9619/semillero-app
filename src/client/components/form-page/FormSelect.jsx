import React from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function FormSelect({
  name,
  label,
  values,
  options,
  required = true,
  isSubmitting,
  handleChange,
  errors,
  touched,
}) {
  return (
    <FormControl
      fullWidth
      required={required}
      variant="outlined"
      error={!!errors[name]}
      disabled={isSubmitting}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        label={label}
        disabled={isSubmitting}
        value={values[name] || ''}
        onChange={handleChange}
      >
        {(options || []).map((d, i) => (
          <MenuItem key={i} value={d.value}>
            {d.label}
          </MenuItem>
        ))}
      </Select>
      {!!touched[name] && !!errors[name] && (
        <FormHelperText>{errors[name] || ''}</FormHelperText>
      )}
    </FormControl>
  );
}
