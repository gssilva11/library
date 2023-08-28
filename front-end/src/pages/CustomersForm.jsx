import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'


export default function UserForm() {
  
  const [state, setState] = React.useState({
    user: {}      // objeto vazio
  })

  const states = [
    { label: 'Distrito Federal', value: 'DF'},
    { label: 'Espírito Santo', value: 'ES'},
    { label: 'Goiás', value: 'GO'},
    { label: 'Minas Gerais', value: 'MG'},
    { label: 'Paraná', value: 'PR'},
    { label: 'Rio de Janeiro', value: 'RJ'},
    { label: 'São Paulo', value: 'SP'}
  ]

  const {
    user 
  } = state

  return(
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de clientes
      </Typography>
      
      <form>
        <TextField 
          id="cpf"
          name="CPF" 
          label="CPF"
          variant="outlined"
          required
          fullWidth
          placeholder='Ex.: 000.000.000-00'
          value={user.cpf}
        />

        <TextField 
          id="name"
          name="name" 
          label="Nome completo"       // nome que aparece em cima do campo 
          variant="outlined"          // aparência do campo
          required
          fullWidth
          value={user.name}
          />

        <TextField 
          id="birth_date"
          name="birth_date" 
          label="Data de nascimento"
          variant="outlined"
          fullWidth
          placeholder='DD/MM/AAAA'
          value={user.birth_date}
        />

        <TextField 
          id="cep"
          name="cep" 
          label="CEP"
          variant="outlined"
          required
          fullWidth
          placeholder='00000-000'
          value={user.cep}
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
        />

        <TextField 
          id="house_number"
          name="house_number" 
          label="Número da casa"
          variant="outlined"
          required
          fullWidth
          value={user.house_number}
        />

        <TextField 
          id="complements"
          name="complements" 
          label="Complemento"
          variant="outlined"
          fullWidth
          placeholder='Apto., bloco, casa, etc.'
          value={user.complements}
        />

        <TextField 
          id="neighborhood"
          name="neighborhood" 
          label="Bairro"
          variant="outlined"
          required
          fullWidth
          value={user.neighborhood}
        />

        <TextField
          id="state"
          name="state"
          select
          label="UF"
          variant="outlined"
          fullWidth
          required
          SelectProps={{
          native: false,
          }}
          helperText="Please select your currency"
        >
          {states.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField 
          id="city"
          name="city" 
          label="Cidade"
          variant="outlined"
          required
          fullWidth
          value={user.city}
        />
  
        <TextField 
          id="phone"
          name="phone" 
          label="Celular / Telefone de contato"
          variant="outlined"
          type='phone'
          required
          fullWidth
          placeholder='(00) 00000-0000'
          value={user.phone}
        />
  
        <TextField 
          id="email"
          name="email" 
          label="E-mail"
          variant="outlined"
          type='email'
          required
          fullWidth
          placeholder='email@email.com'
          value={user.email}
        />


      </form>
    </>
  )
}