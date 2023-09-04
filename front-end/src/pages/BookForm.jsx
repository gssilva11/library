import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
// O Box cria uma div
import Box from '@mui/material/Box'
// Só importar essa caraia 
import myfetch from '../utils/myfetch'
import Waiting from '../components/ui/Waiting'
import Notification from '../components/ui/Notification'
// Para voltar a pagina de clientes
import { useNavigate } from 'react-router-dom'

export default function BookForm() {
  
  const navigate = useNavigate()

  const [state, setState] = React.useState({
    book: {},      // objeto vazio
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    }
  })

  // Cria JSON que será submetido para o back-end
  const {
    book,
    showWaiting,
    notification
  } = state

  function handleFieldChange(event) {
    console.log(event)
    const newBook = {...book}
    newBook[event.target.name] = event.target.value
    setState({...state, book: newBook})
  }

  async function handleFormSubmit(event) {
    setState({...state, showWaiting: true})   // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
    try {
      const result = await myfetch.post('book', book)
        setState({...state,
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'success',
          message: 'Dados salvos com sucesso.'
        }
      })   
    }
    catch(error) {
        setState({...state, 
        showWaiting: false,   // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotificationClose() {
    const status = notification.severity

    // Fecha a barra de notificação
    setState({...state, notification:{
      show: false,
      severity: status,
      message: ''
    }})

    // Volta para a página de listagem
    if(status === 'success') navigate('/book')
  }

  return(
    <>
      <Waiting show={showWaiting}/>

      <Notification
        show={notification.show}
        severity={notification.severity}
        message={notification.message}
        onClose={handleNotificationClose}
      />

      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de livros
      </Typography>
      
      <form onSubmit={handleFormSubmit}>
        <Box className='form-fields'>
          <TextField 
            id="title"
            name="title" 
            label="Título"
            variant="outlined"
            required
            fullWidth
            value={book.title}
            onChange={handleFieldChange}
            />

          <TextField 
            id="author"
            name="author" 
            label="Autor"
            variant="outlined"
            required
            fullWidth
            value={book.author}
            onChange={handleFieldChange}
          />

          <TextField 
            id="year"
            name="year" 
            label="Ano"
            variant="outlined"
            fullWidth
            placeholder='DD/MM/AAAA'
            value={book.year}
            onChange={handleFieldChange}
          />

          <TextField 
            id="belongs_to"
            name="belongs_to" 
            label="Inst. Proprietária"
            variant="outlined"
            required
            fullWidth
            value={book.belongs_to}
            onChange={handleFieldChange}
          />

          <TextField 
            id="publisher_id"
            name="publisher_id" 
            label="Editora ID"
            variant="outlined"
            required
            fullWidth
            value={book.publisher_id}
            onChange={handleFieldChange}
          />

          <TextField 
            id="status"
            name="status" 
            label="Status"
            variant="outlined"
            fullWidth
            value={book.status}
            onChange={handleFieldChange}
          />

        </Box>
        
        <Box sx={{ fontFamily: 'monospace' }}>
          {JSON.stringify(book)}
        </Box>

        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button variant='contained' color='secondary' type='submit'>Salvar</Button>
          <Button variant='outlined'>Voltar</Button>
        </Toolbar>


      </form>
    </>
  )
}