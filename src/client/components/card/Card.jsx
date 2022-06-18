import React from 'react';
import { Paper, Box } from '@mui/material';
import { useTheme } from '@mui/styles';

export default function Card({ children, useRight = true }) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" width="100%" px={8} py={4}>
      <Paper
        px={6}
        pt={useRight ? 6 : 12}
        pb={6}
        elevation={6}
        component={Box}
        position="relative"
      >
        <Adornment
          top={useRight ? 20 : 30}
          color={theme.palette.secondary.main}
          useRight={useRight}
        />
        <Adornment
          top={useRight ? 30 : 20}
          color={theme.palette.primary.main}
          width={40}
          useRight={useRight}
        />
        {children}
      </Paper>
    </Box>
  );
}

function Adornment({ top = 40, color, width = 80, useRight = true }) {
  return (
    <div
      style={{
        top,
        width,
        height: 30,
        background: color,
        ...(useRight
          ? { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
          : { borderTopRightRadius: 16, borderBottomRightRadius: 16 }),
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        position: 'absolute',
        ...(useRight ? { right: 0 } : { left: 0 }),
      }}
    />
  );
}
