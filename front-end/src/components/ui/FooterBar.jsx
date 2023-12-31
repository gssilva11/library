import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CoffeeIcon from '@mui/icons-material/Coffee';

export default function FooterBar() {
  return (
    <Toolbar 
      variant="dense" 
      component="footer" 
      sx={{
        backgroundColor: 'black',
        justifyContent: 'center',
        minHeight: '30px',
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        '& a': {
          color: 'red'
        }
      }}
    >
      <Typography variant="caption" sx={{ color: 'grey' }}>
          Desenvolvido com <CoffeeIcon fontSize="small" /> por <a href="mailto:gssilva2711@gmail.com">Gabriel S Silva</a>. Todos os direitos reservados.
      </Typography>
    </Toolbar>
  );
}