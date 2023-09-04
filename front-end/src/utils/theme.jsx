import { createTheme } from '@mui/material/styles';
import { brown, red} from '@mui/material/colors';
import { ptBR } from '@mui/x-data-grid'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: brown[900],
    },
    secondary: {
      main: red[900],
    },
  },
  typography: {
    h1: {
      fontSize: '30px',
      fontWeight: 'bold'
    }
  }
}, ptBR);

export default theme
