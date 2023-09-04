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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function PublisherList() {

  const API_ENDPOINT = import.meta.env.VITE_API_BASE + 'publisher'

  const [state, setState] = React.useState({
    publisher: {}
  })

  const {
    publisher
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
      if(result.ok) setState({...state, publisher: await result.json()})
      
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)

    }
    catch(error) {
      // Exibimos o erro no console
      console.error(error)
    }
  }

  const columns = [
    { field: 'id_p', 
      headerName: 
      'ID', width: 300
    },
    {
      field: 'name_p',
      headerName: 'Nome',
      width: 150
    },
    {
      field: 'city_p',
      headerName: 'Cidade',
      width: 170
    },    
    {
      field: 'state_p',
      headerName: 'Estado',
      width: 170
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

  async function handleDeleteButtonClick(id) {
    if(confirm('Deseja realmente excluir este item?')) {
      try {
        // Faz a chamada ao back-end para excluir o cliente
        const result = await fetch(`${API_ENDPOINT}/${id}`, {
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
        Listagem de Editoras
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
            Cadastrar nova editora
          </Button>
        </Link>
      </Box>

      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={publisher}
          getRowId={(row) => row.id_p}
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