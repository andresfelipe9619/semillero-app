import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, StyledInputBase, SearchIconWrapper } from './styles';

export default function Navbar({ loading, handleSearch, handleRegister }) {
  const [documentToSearch, setDocumentToSearch] = useState('');

  function handleChange(event) {
    const { value } = event.target;
    setDocumentToSearch(value);
  }
  return (
    <Box sx={{ flexGrow: 1 , zIndex: 10 , position: 'relative'}} bgcolor={'white'}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            color="primary"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Semillero Universidad del Valle
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChange}
              placeholder="Búscar estudiante..."
              inputProps={{ 'aria-label': 'buscar estudiante' }}
            />
          </Search>
          <Button
            disabled={loading}
            variant="contained"
            sx={{ margin: '0px 8px' }}
            onClick={() => handleSearch(documentToSearch)}
          >
            Buscar
          </Button>
          <Button
            disabled={loading}
            variant="outlined"
            sx={{ margin: '0px 8px' }}
            onClick={() => handleRegister(documentToSearch)}
          >
            Registrar
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
