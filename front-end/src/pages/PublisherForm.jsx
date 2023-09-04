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

import Alert from '../components/ui/Alert'

export default function PublisherForm() {
  
  const navigate = useNavigate()

  const [state, setState] = React.useState({
    publisher: {},      // objeto vazio
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    }
  })

  // Cria JSON que será submetido para o back-end
  const {
    publisher,
    showWaiting,
    notification
  } = state

  function handleFieldChange(event) {
    console.log(event)
    const newPublisher = {...publisher}
    newPublisher[event.target.name] = event.target.value
    setState({...state, publisher: newPublisher})
  }

  async function handleFormSubmit(event) {
    setState({...state, showWaiting: true})   // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
    try {
      const result = await myfetch.post('publisher', publisher)
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
    if(status === 'success') navigate('/publisher')
  }

  const states = [
    { label: 'Acre', value: 'AC'},
    { label: 'Alagoas', value: 'AL'},
    { label: 'Amapá', value: 'AP'},
    { label: 'Amazonas', value: 'AM'},
    { label: 'Bahia', value: 'BA'},
    { label: 'Ceará', value: 'CE'},
    { label: 'Distrito Federal', value: 'DF'},
    { label: 'Espírito Santo', value: 'ES'},
    { label: 'Goiás', value: 'GO'},
    { label: 'Maranhão', value: 'MA'},
    { label: 'Mato Grosso', value: 'MT'},
    { label: 'Mato Grosso do Sul', value: 'MS'},
    { label: 'Minas Gerais', value: 'MG'},
    { label: 'Pará', value: 'PA'},
    { label: 'Paraíba', value: 'PB'},
    { label: 'Paraná', value: 'PR'},
    { label: 'Pernambuco', value: 'PE'},
    { label: 'Piauí', value: 'PI'},
    { label: 'Rio de Janeiro', value: 'RJ'},
    { label: 'Rio Grande do Norte', value: 'RN'},
    { label: 'Rio Grande do Sul', value: 'RS'},
    { label: 'Rondônia', value: 'RO'},
    { label: 'Roraima', value: 'RR'},
    { label: 'Santa Catarina', value: 'SC'},
    { label: 'São Paulo', value: 'SP'},
    { label: 'Sergipe', value: 'SE'},
    { label: 'Tocantins', value: 'TO'}
  ]

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
        Cadastro de editoras
      </Typography>
      
      <form onSubmit={handleFormSubmit}>
        <Box className='form-fields'>
          <TextField 
            id="name_p"
            name="name_p" 
            label="Nome"
            variant="outlined"
            required
            fullWidth
            value={publisher.name_p}
            onChange={handleFieldChange}
            />

          <TextField 
            id="city_p"
            name="city_p" 
            label="Cidade"
            variant="outlined"
            required
            fullWidth
            value={publisher.city_p}
            onChange={handleFieldChange}
          />

          <TextField 
            id="state_p"
            name="state_p" 
            label="Estado"
            variant="outlined"
            fullWidth
            value={publisher.state_p}
            onChange={handleFieldChange}
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Box>
        
        <Box sx={{ fontFamily: 'monospace' }}>
          {JSON.stringify(publisher)}
        </Box>

        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button variant='contained' color='secondary' type='submit'>Salvar</Button>
          <Button variant='outlined'>Voltar</Button>
        </Toolbar>


      </form>
    </>
  )
}