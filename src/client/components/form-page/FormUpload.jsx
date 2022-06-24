import { Button } from '@mui/material';
import React from 'react';

export default function FormUpload({
  accept,
  name,
  label,
  handleChange,
  isSubmitting,
}) {
  return (
    <>
      <input
        hidden
        name={name}
        type="file"
        disabled={isSubmitting}
        id={`${name}-button-file`}
        accept={accept || 'application/pdf'}
        onChange={handleChange}
      />
      <label htmlFor={`${name}-button-file`}>
        {label}
        <Button variant="contained" component="span" disabled={isSubmitting}>
          Seleccionar Archivo
        </Button>
      </label>
    </>
  );
}
