import React,{useState,useEffect} from 'react';
import api from '../../Api/api';
import { ClientesI } from '../../Models/ClientesI';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Clientes = () => {

    const [cliente, setCliente] = useState([]);

    const getClientes = async () =>{
        await api.get('/Cliente').then(res => {
            console.log(res.data)
            setCliente(res.data)
        })       
    };

    useEffect(() => { 
        getClientes();  
    }, []);


    const handleEditClick =( event, cellValue)=>{
        console.log("Editando "+cellValue.row.Id)
    };

    const handleDeleteClick =( event, cellValue)=>{
        console.log("Eliminando "+ cellValue.row.Id)
    };

    


    const columns = [
        { field: 'Id', headerName: 'ID' ,width: 70},
        { field: 'NombreCliente', headerName: 'Nombre Cliente',width: 170 },
        { field: 'Cedula', headerName: 'Cedula',width: 170 },
        { field: 'Membresia', headerName: 'Membresia',width: 170 } ,
        { field: 'Acciones',width: 170,
            renderCell:(rowValue) =>{
                return(
                    <>
                    <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="label"
                    onClick={(event) => { handleEditClick(event, rowValue)}}
                    >
                    <ModeEditOutlineIcon />
                    </IconButton>

                    <IconButton 
                    color="error" 
                    aria-label="upload picture" 
                    component="label"
                    onClick={(event) => { handleDeleteClick(event, rowValue)}}
                    >
                    <DeleteIcon />
                    </IconButton>


                    </>
                    
                )
            }
        }
      ];


      



    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>Clientes</h1>
            <hr/>
            <br/>
            <Grid container>
                <Button variant="contained" color="success" startIcon={<AddIcon />}>
                    Agregar
                </Button>
            </Grid>
            <br/>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                        getRowId={(cliente) => cliente.Id}
                        rows={cliente}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        />
                    </div>
                </div>
           
            
        
        </div>
    );
}

export default Clientes;
