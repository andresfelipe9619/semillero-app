import { Button } from '@mui/material';
import React from 'react';

export default function FormUpload({ name, label }) {
  return (
    <>
      <input
        hidden
        name={name}
        type="file"
        id={`${name}-button-file`}
        accept="application/pdf"
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
