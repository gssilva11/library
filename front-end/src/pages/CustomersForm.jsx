import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// MODIFICADO
// Vamos adicionar botão de salvar e voltar no cadastro de clientes
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

export default function CustomersForm() {
  
  // MODIFICADO
  const navigate = useNavigate()

  // MODIFICADO: adicionar showWaiting: false
  const [state, setState] = React.useState({
    customer: {},      // objeto vazio
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    }
  })

  // Cria JSON que será submetido para o back-end
  const {
    customer,
    // MODIFICADO: adicionar showWaiting e notification
    showWaiting,
    notification
  } = state

  const states = [
    { label: 'Distrito Federal', value: 'DF'},
    { label: 'Espírito Santo', value: 'ES'},
    { label: 'Goiás', value: 'GO'},
    { label: 'Minas Gerais', value: 'MG'},
    { label: 'Paraná', value: 'PR'},
    { label: 'Rio de Janeiro', value: 'RJ'},
    { label: 'São Paulo', value: 'SP'}
  ]

  // MODIFICADO
  // Colocar dentro de TODOS os <TextField> => onChange={handleFieldChange}
  // onChange recebe como parametro um objeto chamado event
  // target é o elemento HTML que disparou o evento (no console o que interessa é o 'name' e o 'value')
  // --
  // Pulo do gato: trabalhar com o mesmo nome do campo que definimos la no prisma -> newCustomer[event.taget.name]
  // --
  // O objeto JSON que se forma é o que iremos submeter ao banco de dados
  function handleFieldChange(event) {
    console.log(event)
    const newCustomer = {...customer}
    newCustomer[event.target.name] = event.target.value
    setState({...state, customer: newCustomer})
  }

  // MODIFICADO: submete os dados para o banco
  async function handleFormSubmit(event) {
    /*Novo*/setState({...state, showWaiting: true})   // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
    try {
      const result = await myfetch.post('customer', customer)
      /*Novo*/setState({...state,
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'success',
          message: 'Dados salvos com sucesso.'
        }
      })   
    }
    catch(error) {
      /*Novo*/setState({...state, 
        showWaiting: false,   // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  // MODIFICADO: criar nova função 
  function handleNotificationClose() {
    const status = notification.severity

    // Fecha a barra de notificação
    setState({...state, notification:{
      show: false,
      severity: status,
      message: ''
    }})

    // Volta para a página de listagem
    if(status === 'success') navigate('/customers')
  }

  return(
    <>
      {/* MODIFICADO */}
      <Waiting show={showWaiting}/>

      {/* MODIFICADO */}
      <Notification
        show={notification.show}
        severity={notification.severity}
        message={notification.message}
        onClose={handleNotificationClose}
      />

      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de clientes
      </Typography>
      
      {/* MODIFICADO: criar onSubmit */}
      <form onSubmit={handleFormSubmit}>
        {/* MODIFICADO: Box */}
        <Box className='form-fields'>
          <TextField 
            id="name"
            name="name" 
            label="Nome completo"       // nome que aparece em cima do campo 
            variant="outlined"          // aparência do campo
            required
            fullWidth
            value={customer.name}
            onChange={handleFieldChange}
            />

          <TextField 
            id="ident_document"
            name="ident_document" 
            label="CPF"
            variant="outlined"
            required
            fullWidth
            placeholder='Ex.: 000.000.000-00'
            value={customer.ident_document}
            onChange={handleFieldChange}
          />

          <TextField 
            id="birth_date"
            name="birth_date" 
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            placeholder='DD/MM/AAAA'
            value={customer.birth_date}
            onChange={handleFieldChange}
          />

          <TextField 
            id="street_name"
            name="street_name" 
            label="Logradouro (Rua, Av., etc)"
            variant="outlined"
            required
            fullWidth
            placeholder='Ex.: Rua Principal'
            value={customer.street_name}
            onChange={handleFieldChange}
          />

          <TextField 
            id="house_number"
            name="house_number" 
            label="Número da casa"
            variant="outlined"
            required
            fullWidth
            value={customer.house_number}
            onChange={handleFieldChange}
          />

          <TextField 
            id="complements"
            name="complements" 
            label="Complemento"
            variant="outlined"
            fullWidth
            placeholder='Apto., bloco, casa, etc.'
            value={customer.complements}
            onChange={handleFieldChange}
          />

          <TextField 
            id="neighborhood"
            name="neighborhood" 
            label="Bairro"
            variant="outlined"
            required
            fullWidth
            value={customer.neighborhood}
            onChange={handleFieldChange}
          />

          <TextField
            id="state"
            name="state"
            select
            label="UF"
            variant="filled"
            fullWidth
            required
            value={customer.state}
            onChange={handleFieldChange}
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField 
            id="municipality"
            name="municipality" 
            label="Município"
            variant="outlined"
            required
            fullWidth
            value={customer.municipality}
            onChange={handleFieldChange}
          />
    
          <TextField 
            id="phone"
            name="phone" 
            label="Celular / Telefone de contato"
            variant="outlined"
            type='phone'
            required
            fullWidth
            value={customer.phone}
            onChange={handleFieldChange}
          />
    
          <TextField 
            id="email"
            name="email" 
            label="E-mail"
            variant="outlined"
            type='email'
            required
            fullWidth
            value={customer.email}
            onChange={handleFieldChange}
          />
        </Box>
        
        {/* MODIFICADO */}
        <Box sx={{ fontFamily: 'monospace' }}>
          {JSON.stringify(customer)}
        </Box>

        {/* MODIFICADO */}
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button variant='contained' color='secondary' type='submit'>Salvar</Button>
          <Button variant='outlined'>Voltar</Button>
        </Toolbar>


      </form>
    </>
  )
}