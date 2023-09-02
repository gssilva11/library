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
    { field: 'cpf', 
      headerName: 'CPF', 
      width: 110 
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 140
    },
    {
      field: 'birth_date',
      headerName: 'Data nasc.',
      width: 100,
      valueFormatter: params => {
        if(params.value) return format(new Date(params.value), 'dd/MM/yyyy')
        else return ''
      }
    },
    {
      field: 'code',
      headerName: 'Código',
      headerAlign: 'center',
      align: 'center',
      width: 100
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 130
    },
    {
      field: 'institution',
      headerName: 'Instituição',
      width: 130
    },
    {
      field: 'role',
      headerName: 'Atribuição',
      width: 90
    },
    {
      field: 'cep',
      headerName: 'CEP',
      width: 90
    },
    {
      field: 'street_name',
      headerName: 'Endereço',
      width: 120
    },
    {
      field: 'house_number',
      headerName: 'N°. Casa',
      width: 110
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120
    },

    // {
    //   field: 'city',
    //   headerName: 'Município/UF',
    //   width: 300,
    //   // Colocando dois campos na mesma célula
    //   valueGetter: params => params.row.city + '/' + params.row.state
    // },

    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params =>
        <Link to={'./' + params.id}>
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
          onClick={() => handleDeleteButtonClick(params.id)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
    }
  ];

  // async function handleDeleteButtonClick(id) {
  //   if(confirm('Deseja realmente excluir este item?')) {
  //     try {
  //       // Faz a chamada ao back-end para excluir o cliente
  //       const result = await fetch(`${API_ENDPOINT}/${id}`, {
  //         method: 'DELETE'
  //       })
  //       // Se a exclusão tiver sido feita com sucesso, atualiza a listagem
  //       if(result.ok) loadData()
  //       alert('Exclusão efetuada com sucesso!')
  //     }
  //     catch(error) {
  //       console.error(error)
  //     }
  //   }
  // }
  
  return (
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Listagem de usuários
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
            Cadastrar novo usuário
          </Button>
        </Link>
      </Box>

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={user}
          getRowId={(row) => row.cpf}
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