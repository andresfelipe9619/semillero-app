import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const DoNotCopyPaste = e => e.preventDefault();

const EmailHandlers = {
  onCopy: DoNotCopyPaste,
  onPaste: DoNotCopyPaste,
  onCut: DoNotCopyPaste,
  inputProps: { style: { textTransform: 'lowercase' } },
};

export default function FormInput({
  name,
  label,
  values,
  type,
  disabled,
  money = false,
  readOnly = false,
  required = true,
  isSubmitting,
  handleChange,
  helperText = '',
  handleBlur,
  errors,
  touched,
}) {
  const value__ = ((values[name] !== undefined && values[name] !== null)? (typeof values[name] === 'string')? (values[name]).toLowerCase() : values[name] : '')

  const isEmail = type === 'email';
  return (
    <TextField
      fullWidth
      id={name}
      label={label}
      required={required}
      disabled={disabled || isSubmitting}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value__}
      type={type}
      error={!!touched[name] && !!errors[name]}
      variant="outlined"
      InputProps={{
        readOnly,
        startAdornment: money ? (
          <InputAdornment position="start">$</InputAdornment>
        ) : null,
      }}
      helperText={!!touched[name] && errors[name] ? errors[name] : helperText}
      {...(isEmail ? EmailHandlers : {})}
    />
  );
}
