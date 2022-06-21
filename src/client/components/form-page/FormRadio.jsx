import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormRadioGroup(props) {
  const { name, legend, options, values, handleChange } = props;
  const id = `radio-buttons-group-${name}`;
  return (
    <FormControl>
      <FormLabel id={id}>{legend}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={id}
        defaultValue="M"
        name={name}
        value={values[name]}
        onChange={handleChange}
      >
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
