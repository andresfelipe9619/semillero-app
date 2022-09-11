import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormRadioGroup(props) {
  const {
    name,
    legend,
    errors,
    options,
    values,
    handleChange,
    isSubmitting,
  } = props;
  const id = `radio-buttons-group-${name}`;
  const checked = value => value === values[name];
  return (
    <FormControl disabled={isSubmitting} error={!!errors[name]} fullWidth>
      <FormLabel id={id}>{legend}</FormLabel>
      <RadioGroup
        aria-labelledby={id}
        name={name}
        value={values[name]}
        onChange={handleChange}
      >
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio checked={checked(value)} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
