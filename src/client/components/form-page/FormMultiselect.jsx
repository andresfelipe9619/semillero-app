import React from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import { makeStyles, useTheme } from '@mui/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles(theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function getStyles(name, options, theme) {
  return {
    fontWeight:
      (options || []).findIndex(o => o?.id === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormMultiselect({
  name,
  label,
  values,
  options,
  isSubmitting,
  handleChange,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const value = values[name] || [];
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        label={label}
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple
        disabled={isSubmitting}
        value={value}
        onChange={handleChange}
        input={
          <Input
            variant="outlined"
            disabled={isSubmitting}
            id={`select-multiple-${name}`}
            aria-label={label}
          />
        }
        renderValue={selected => {
          const items = selected.map(id => options.find(o => o.value === id));
          return (
            <div className={classes.chips}>
              {items.map((p, i) => (
                <Chip
                  key={p + i}
                  label={p?.label}
                  disabled={isSubmitting}
                  className={classes.chip}
                />
              ))}
            </div>
          );
        }}
        MenuProps={MenuProps}
      >
        {options.map((o, i) => (
          <MenuItem
            key={i}
            value={o.value}
            style={getStyles(o.value, value, theme)}
          >
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
