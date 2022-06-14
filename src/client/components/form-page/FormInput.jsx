import React from 'react';
import TextField from '@mui/material/TextField';

export default function FormInput({
  name,
  label,
  values,
  type,
  required = true,
  isSubmitting,
  handleChange,
  handleBlur,
  errors,
  touched,
  ...fieldProps
}) {
  return (
    <TextField
      fullWidth
      id={name}
      label={label}
      required={required}
      disabled={isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name] || ''}
      type={type}
      error={!!touched[name] && !!errors[name]}
      variant="outlined"
      helperText={!!touched[name] && errors[name] ? errors[name] : ''}
      {...fieldProps}
    />
  );
}
