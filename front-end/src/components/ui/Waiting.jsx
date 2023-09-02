import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// <APAGAR>
// import Button from '@mui/material/Button';

// MODIFICADO: trocar nome e adicionar parâmetro
export default function Waiting({show = false, handleClose}) {
  
  // <APAGAR>
  // const [open, setOpen] = React.useState(show);
  // const handleClose = () => {
  //   setOpen(false);
  // };  
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div>
      
      {/* 
      <APAGAR>
      <Button onClick={handleOpen}>Show backdrop</Button> 
      */}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}

        // <APAGAR>
        // onClick={handleClose}
      
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}