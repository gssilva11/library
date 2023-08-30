import * as React from 'react';
// <APAGAR>
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// MODIFICADO: trocar nome e adicionar parâmetros (props)
export default function Notification({
  show=false, 
  message, 
  severity='success',
  timeout = 4000, 
  onClose
}) {
  // <APAGAR>
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // MODIFICADO: adicionar IF
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (typeof onClose === 'function') onClose(event, reason)

    // <APAGAR>
    // setOpen(false);
  };

  return (
    
    // <APAGAR>
    // <Stack spacing={2} sx={{ width: '100%' }}>
    //   <Button variant="outlined" onClick={handleClick}>
    //     Open success snackbar
    //   </Button>

      <Snackbar open={show} autoHideDuration={timeout} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      // <APAGAR>
      // <Alert severity="error">This is an error message!</Alert>
      // <Alert severity="warning">This is a warning message!</Alert>
      // <Alert severity="info">This is an information message!</Alert>
      // <Alert severity="success">This is a success message!</Alert>
      
    // <APAGAR>
    // </Stack>
  );
}