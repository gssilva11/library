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

export default function UserForm() {
  
  const navigate = useNavigate()

  const [state, setState] = React.useState({
    user: {},      // objeto vazio
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    }
  })

  // Cria JSON que será submetido para o back-end
  const {
    user,
    showWaiting,
    notification
  } = state

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

  function handleFieldChange(event) {
    console.log(event)
    const newUser = {...user}
    newUser[event.target.name] = event.target.value
    setState({...state, user: newUser})
  }

  async function handleFormSubmit(event) {
    setState({...state, showWaiting: true})   // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
    try {
      const result = await myfetch.post('user', user)
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
    if(status === 'success') navigate('/user')
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
        Cadastro de usuários
      </Typography>
      
      <form onSubmit={handleFormSubmit}>
        <Box className='form-fields'>
          <TextField 
            id="name"
            name="name" 
            label="Nome completo"       // nome que aparece em cima do campo 
            variant="outlined"          // aparência do campo
            required
            fullWidth
            value={user.name}
            onChange={handleFieldChange}
            />

          <TextField 
            id="cpf"
            name="cpf" 
            label="CPF"
            variant="outlined"
            required
            fullWidth
            placeholder='Ex.: 000.000.000-00'
            value={user.cpf}
            onChange={handleFieldChange}
          />

          <TextField 
            id="birth_date"
            name="birth_date" 
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            placeholder='DD/MM/AAAA'
            value={user.birth_date}
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
            value={user.street_name}
            onChange={handleFieldChange}
          />

          <TextField 
            id="house_number"
            name="house_number" 
            label="Número da casa"
            variant="outlined"
            required
            fullWidth
            value={user.house_number}
            onChange={handleFieldChange}
          />

          <TextField 
            id="complements"
            name="complements" 
            label="Complemento"
            variant="outlined"
            fullWidth
            placeholder='Apto., bloco, casa, etc.'
            value={user.complements}
            onChange={handleFieldChange}
          />

          <TextField 
            id="neighborhood"
            name="neighborhood" 
            label="Bairro"
            variant="outlined"
            required
            fullWidth
            value={user.neighborhood}
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
            value={user.state}
            onChange={handleFieldChange}
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField 
            id="city"
            name="city" 
            label="Cidade"
            variant="outlined"
            required
            fullWidth
            value={user.cidade}
            onChange={handleFieldChange}
          />

          <TextField 
            id="cep"
            name="cep" 
            label="CEP"
            variant="outlined"
            required
            fullWidth
            value={user.cep}
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
            value={user.phone}
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
            value={user.email}
            onChange={handleFieldChange}
          />
          <TextField 
            id="password"
            name="password" 
            label="Senha"
            variant="outlined"
            required
            fullWidth
            value={user.password}
            onChange={handleFieldChange}
          />

          <TextField 
            id="code"
            name="code" 
            label="Código"
            variant="outlined"
            required
            fullWidth
            value={user.code}
            onChange={handleFieldChange}
          />

          <TextField 
            id="street_type"
            name="street_type" 
            label="Tipo rua"
            variant="outlined"
            required
            fullWidth
            value={user.street_type}
            onChange={handleFieldChange}
          />

          <TextField 
            id="institution"
            name="institution" 
            label="Instituição"
            variant="outlined"
            required
            fullWidth
            value={user.institution}
            onChange={handleFieldChange}
          />
        </Box>
        
        <Box sx={{ fontFamily: 'monospace' }}>
          {JSON.stringify(user)}
        </Box>

        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button variant='contained' color='secondary' type='submit'>Salvar</Button>
          <Button variant='outlined'>Voltar</Button>
        </Toolbar>


      </form>
    </>
  )
}