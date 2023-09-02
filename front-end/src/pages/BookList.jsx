import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom'

export default function BookList() {

  const API_ENDPOINT = import.meta.env.VITE_API_BASE + 'book'

  const [state, setState] = React.useState({
    book: {}
  })

  const {
    book
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
      if(result.ok) setState({...state, book: await result.json()})
      
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)

    }
    catch(error) {
      // Exibimos o erro no console
      console.error(error)
    }
  }

  const columns = [
    { field: 'code', 
      headerName: 'Código',
      width: 300
    },
    {
      field: 'title',
      headerName: 'Título',
      width: 100
    },
    {
      field: 'author',
      headerName: 'Autor',
      width: 100
    },    
    {
      field: 'year',
      headerName: 'Ano',
      width: 200
    },
    {
      field: 'belongs_to',
      headerName: 'Doador',
      width: 150
    },
    {
      field: 'publisher_id',
      headerName: 'ID Editora',
      width: 300
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100
    },
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
        Listagem de Livros
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
            Cadastrar novo livro
          </Button>
        </Link>
      </Box>

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={book}
          getRowId={(row) => row.code}
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