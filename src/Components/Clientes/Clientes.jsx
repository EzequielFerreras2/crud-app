import React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Modal, TextField,ButtonGroup,Alert} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getClientes, getClientesById, postCliente} from '../../Services/ClientesAPi'
import { useForm } from "react-hook-form";


const Clientes = () => {

    /*Estado info CLiente */
    const [cliente, setCliente] = useState([]);

    /*Peticion de todos los clientes con Axios */
    const getCliente =  () =>{

        getClientes().then((res) =>{
            setCliente(res.data)
        })
             
    };

    /* Ciclo de Vida aplicacion*/
    useEffect(() => { 
        getCliente();  
    }, []);


    /* Agregar CLiente */
    const [agregarCiente, setAgregarCiente] = useState({

        NombreCLiente:"",
        Cedula:"",
        Membresia:""

    });

    const { register, handleSubmit, watch, formState: { errors },setValue } = useForm();

    const agregarClientes = (cli) =>{

        try
        { 
            
            postCliente(cli).then( res =>
            {
                openAndCloseModalAgregar()
            })

            

            alert("Cliente Agregado")

            
                window.location.reload();
                openAndCloseAlert()
           

        }


        catch
        {
            alert("Error")
        }
        
        
          
    }

    const onSubmitAdd = data => {
        setAgregarCiente(data) 
        agregarClientes(data); 
        
    };

/* Agregar CLiente */

 

    

    /*Eventos Click eliminar y Editar  */
    const handleEditClick =( event, cellValue)=>{

        getClientesById(cellValue.row.Id).then( (res) =>{
            
        })
        

        console.log("Editando "+cellValue.row.Id)
    };

    const handleDeleteClick =( event, cellValue)=>{

        console.log("Eliminando "+ cellValue.row.Id)
    };

    /* Estado Membresia*/
    const [membresia, setMembresia] = useState('');

    /* Cambio Estado Membresia */

    const handleChangemembresia =(event) =>{
        setMembresia(event.target.value);
        
    };

    /* Alerta */

    const [alert, setAlert] = useState(false);
    
    const openAndCloseAlert = () =>{

        setAlert(!alert);
    }

    
    /*Estado Modal */
    const [agregarModal, setAgregarModal] = useState(false);

    const openAndCloseModalAgregar = () =>{

        setAgregarModal(!agregarModal);
    }

    const [editModal, setEditModal] = useState(false);

    const openAndCloseModalEdit = () =>{

        setEditModal(!editModal);
    }
    
    /*Estilo Modal */
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      



    /*Declaramos columnas de la tabla*/
    const columns = [
        { field: 'Id', headerName: 'ID' ,width: 70},
        { field: 'NombreCliente', headerName: 'Nombre Cliente',width: 170 },
        { field: 'Cedula', headerName: 'Cedula',width: 170 },
        { field: 'Membresia', headerName: 'Membresia',width: 170 } ,

        /* Renderisamos botones en la Tabla */
        { field: 'Acciones',width: 120,
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
        /* */
        <div style={{ height: 600, width: '100%' }}>
            <h1>Clientes</h1>
            <hr/>
            <br/>

            {alert && <Alert onClose={()=>openAndCloseAlert()} severity="success">El usuario Se agregado Correctamente</Alert>}

            <Grid container>
                <Button 
                variant="contained" 
                color="success" 
                startIcon={<AddIcon />}
                onClick={()=> openAndCloseModalAgregar()}
                >
                    Agregar
                </Button>

                <Modal
                    open={agregarModal}
                    onClose={openAndCloseModalAgregar}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmitAdd)}>
                            <h3> Agregar Cliente</h3>
                            <hr/>
                            <TextField
                            required
                            id="outlined-required"
                            label="Nombre Cliente"
                            name="NombreCliente"
                            defaultValue=""
                            {...register("NombreCliente",{required:true})}
                            />
                            {errors.NombreCliente?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <TextField
                            required
                            id="outlined-required"
                            label="Cedula"
                            name="Cedula"
                            defaultValue=""
                            {...register("Cedula",{required:true})}
                            />
                            {errors.Cedula?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Membresia</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={membresia}
                                name="Membresia"
                                label="Membresia"
                                {...register("Membresia",{required:true})}
                                onChange={handleChangemembresia}
                                >
                                    <MenuItem value={'Premium'}>Premium</MenuItem>
                                    <MenuItem value={'Super'}>Super</MenuItem>
                                    <MenuItem value={'Regular'}>Regular</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.Membresia?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <div align =" right">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="success" type="submit" >Agregar</Button>
                                <Button color="error"  onClick={()=> openAndCloseModalAgregar()}>Cancelar</Button>
                                
                            </ButtonGroup>
                            </div>
                        </form>
                    </Box>
                    </Modal>

                    <Modal
                    open={editModal}
                    onClose={openAndCloseModalEdit }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmitAdd)}>
                            <h3> Agregar Cliente</h3>
                            <hr/>
                            <TextField
                            required
                            id="outlined-required"
                            label="Nombre Cliente"
                            name="NombreCliente"
                            defaultValue=""
                            {...register("EditarNombreCliente",{required:true})}
                            />
                            {errors.NombreCliente?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <TextField
                            required
                            id="outlined-required"
                            label="Cedula"
                            name="Cedula"
                            defaultValue=""
                            {...register("EditarCedula",{required:true})}
                            />
                            {errors.Cedula?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Membresia</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={membresia}
                                name="EditarMembresia"
                                label="EditarMembresia"
                                {...register("EditarMembresia",{required:true})}
                                onChange={handleChangemembresia}
                                >
                                    <MenuItem value={'Premium'}>Premium</MenuItem>
                                    <MenuItem value={'Super'}>Super</MenuItem>
                                    <MenuItem value={'Regular'}>Regular</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.Membresia?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <div align =" right">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="success" type="submit" >Editar</Button>
                                <Button color="error"  onClick={()=> openAndCloseModalEdit()}>Cancelar</Button>
                                
                            </ButtonGroup>
                            </div>
                        </form>
                    </Box>
                    </Modal>


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
