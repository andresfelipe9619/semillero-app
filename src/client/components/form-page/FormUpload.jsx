import { Button } from '@mui/material';
import React from 'react';

export default function FormUpload({ accept, name, label, handleChange }) {
  return (
    <>
      <input
        hidden
        name={name}
        type="file"
        id={`${name}-button-file`}
        accept={accept || 'application/pdf'}
        onChange={handleChange}
      />
      <label htmlFor={`${name}-button-file`}>
        {label}
        <Button variant="contained" component="span">
          Seleccionar Archivo
        </Button>
      </label>
    </>
  );
}
