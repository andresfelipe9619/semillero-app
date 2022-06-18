import React from 'react';
import { makeStyles } from '@mui/styles';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const { name, legend, options, values, handleChange } = props;
  console.log('props', props);
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup row>
          {options.map(option => {
            const checked = (values[name] || []).some(
              v => +v === +option.value
            );
            return (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={name}
                    value={option.value}
                    onChange={handleChange}
                    checked={checked}
                  />
                }
                label={option.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
