import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/ui/TopBar'
import theme from './utils/theme'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FooterBar from './components/ui/FooterBar'
import CssBaseline from '@mui/material/CssBaseline'


import Homepage from './pages/Homepage'

import UserList from './pages/UserList'
import UserForm from './pages/UserForm'

import BookList from './pages/BookList'
import BookForm from './pages/BookForm'

import PublisherList from './pages/PublisherList'
import PublisherForm from './pages/PublisherForm'


function App() {
  return (
    <>  
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            width: '100vw', 
            minHeight: '100vh', 
            backgroundColor: 'background.default' 
          }}>
            <TopBar />
            <Box sx={{
              margin: '25px 25px 55px 25px'
            }}>

              <Routes>
                <Route path="/" element={ <Homepage /> } />
                                 
                <Route path="/user" element={ <UserList /> } />
                <Route path="/user/new" element={ <UserForm /> } />
{/*                 
                <Route path="/users/:cpf" element={ <UserList /> } />
*/}
                <Route path="/book" element={ <BookList /> } />
                <Route path="/book/new" element={ <BookForm /> } />


                <Route path="/publisher" element={ <PublisherList /> } />
                <Route path="/publisher/new" element={ <PublisherForm /> } />
              </Routes>

            </Box>
            <FooterBar />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
