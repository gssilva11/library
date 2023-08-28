import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom'

export default function UserList() {

  const API_ENDPOINT = import.meta.env.VITE_API_BASE + 'user'

  const [state, setState] = React.useState({
    user: {}
  })

  // Desestruturando as variáveis de estado
  const {
    user
  } = state

  // Este useEffect() será executado apenas uma vez, durante o
  // carregamento da página
  React.useEffect(() => {
    loadData()    // Carrega dos dados do back-end
  }, [])

  async function loadData() {
    try {
      const result = await fetch(API_ENDPOINT)

      // Requisição OK
      if(result.ok) setState({...state, user: await result.json()})
      
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)

    }
    catch(error) {
      // Exibimos o erro no console
      console.error(error)
    }
  }

  const columns = [
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 100
    },
    {
      field: 'name',
      headerName: 'Nome',
      align: 'center',
      headerAlign: 'center',
      width: 100
    },
    {
      field: 'birth_date',
      headerName: 'Data nasc.',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      valueFormatter: params => {
        if(params.value) return format(new Date(params.value), 'dd/MM/yyyy')
        else return ''
      }
    },
    {
      field: 'phone',
      headerName: 'Celular',
      align: 'center',
      headerAlign: 'center',
      width: 100
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 100
    },
    {
      field: 'cep',
      headerName: 'CEP',
      width: 100,
    },
    {
      field: 'street_name',
      headerName: 'Logradouro',
      width: 100,
    },
    {
      field: 'house_number',
      headerName: 'Número da casa',
      width: 100,
    },
    {
      field: 'complements',
      headerName: 'Complemento',
      width: 100,
    },
    {
      field: 'neighborhood',
      headerName: 'Bairro',
      width: 100,
    },
    {
      field: 'city',
      headerName: 'Município/UF',
      width: 100,
      // Colocando dois campos na mesma célula
      valueGetter: params => params.row.city + '/' + params.row.state
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params =>
        <Link to={'./' + params.cpf}>
          <IconButton aria-label="Editar">
            <EditIcon />
          </IconButton>
        </Link> 
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params =>
        <IconButton 
          aria-label="Excluir"
          onClick={() => handleDeleteButtonClick(params.cpf)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
    }
  ];

  async function handleDeleteButtonClick(cpf) {
    if(confirm('Deseja realmente excluir este item?')) {
      try {
        // Faz a chamada ao back-end para excluir o cliente
        const result = await fetch(`${API_ENDPOINT}/${cpf}`, {
          method: 'DELETE'
        })
        // Se a exclusão tiver sido feita com sucesso, atualiza a listagem
        if(result.ok) loadData()
        alert('Exclusão efetuada com sucesso!')
      }
      catch(error) {
        console.error(error)
      }
    }
  }
  
  return (
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Listagem de clientes
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: '25px'  // margin-bottom
      }}>
        <Link to="new">
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            startIcon={<AddBoxIcon />}
          >
            Cadastrar novo cliente
          </Button>
        </Link>
      </Box>

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={user}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}