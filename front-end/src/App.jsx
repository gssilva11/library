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
// import UsersForm from './pages/UsersForm'

import BookList from './pages/BookList'

import PublisherList from './pages/PublisherList'

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
                {/*
                <Route path="/users/new" element={ <UsersForm /> } />
                <Route path="/users/:cpf" element={ <UsersList /> } /> 
                */}

                <Route path="/book" element={ <BookList /> } />


                <Route path="/publisher" element={ <PublisherList /> } />
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