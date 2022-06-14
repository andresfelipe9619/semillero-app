import React from 'react';
import TextField from '@mui/material/TextField';

export default function FormInput({
  name,
  label,
  values,
  type,
  disabled,
  required = true,
  isSubmitting,
  handleChange,
  handleBlur,
  errors,
  touched,
}) {
  return (
    <TextField
      fullWidth
      id={name}
      label={label}
      required={required}
      disabled={disabled || isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name] || ''}
      type={type}
      error={!!touched[name] && !!errors[name]}
      variant="outlined"
      helperText={!!touched[name] && errors[name] ? errors[name] : ''}
    />
  );
}
