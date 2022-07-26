import React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Modal, TextField,ButtonGroup} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getClientes, getClientesById, postCliente,putCliente,deleteClientes} from '../../Services/ClientesAPi';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


    const { register, handleSubmit,  formState: { errors },setValue } = useForm();

    const agregarClientes = (cli) =>{

        try
         {  
            postCliente(cli).then( res =>
            {
                openAndCloseModalAgregar()
                notifySuccess("Cliente Agregado Correcto!")
                console.log("Cliente Agregado Correcto!")
            })
            
                  
            
        }


        catch
        {
            alert("Error")
        }
        
       
          
    };
/* Agregar CLiente */

/* Editar CLiente */


    const editClientes =(id,cliente) =>{

        putCliente(id,cliente).then(res =>{
        openAndCloseModalEdit()
        notifySuccess("Cliente Editado Correcto!")
        console.log("Cliente Editado Correctamente")
        
        })

        
        
    }

    const onSubmitAdd = data => {
         
        console.log(data);
        agregarClientes(data);
       
        
    };

    const onSubmitEdit = async (data) => {  
        editClientes(data.id,data)
        

    };


/* Eliminar CLiente */

const [eliminarCliente, setEliminarCliente] = useState()

const deleteCliente =() =>{

    deleteClientes(eliminarCliente).then(res =>{
        openAndCloseModalDelete()
        notifySuccess("Cliente Eliminado Correcto!")
        console.log("Cliente Eliminado Correcto!")
        
    })

    
};



/* Eliminar CLiente */  

/*Eventos Click eliminar y Editar  */
    const handleEditClick =( event, cellValue)=>{

        openAndCloseModalEdit()
        getClientesById(cellValue.row.Id).then( (res) =>{
        
            setValue("id", res.data.Id)
            setValue("NombreCliente", res.data.NombreCliente)
            setValue("Cedula", res.data.Cedula)
            setValue("Membresia", res.data.Membresia)
            setValue("Grupo", res.data.Grupo)
            setValue("Credito", res.data.Credito)
            setValue("Estatus", res.data.Estatus)
            setValue("FechaIngreso", res.data.FechaIngreso)
            
        })
        

        console.log("Editando "+cellValue.row.Id)
    };

    const handleDeleteClick =( event, cellValue)=>{
        openAndCloseModalDelete()
        setEliminarCliente(cellValue.row.Id)

 
    };

/*Eventos Click eliminar y Editar  */

/* Estado Membresia*/
    const [membresia, setMembresia] = useState('');
/* Estado Membresia*/

/* Estado Membresia*/
const [estatus, setEstatus] = useState('');
/* Estado Membresia*/

/* Cambio Estado Membresia */

    const handleChangemembresia =(event) =>{
        setMembresia(event.target.value);
        
    };
/* Cambio Estado Membresia */

/* Cambio Estado Membresia */

const handleChangeEstado =(event) =>{
    setEstatus(event.target.value);
    
};
/* Cambio Estado Membresia */

/* Alerta */ 

    const notifySuccess = (text) => toast.success(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;

/* Alerta */
    
/*Estado Modal */
    const [agregarModal, setAgregarModal] = useState(false);

    const openAndCloseModalAgregar = () =>{

        setAgregarModal(!agregarModal);
    };

    const [editModal, setEditModal] = useState(false);

    const openAndCloseModalEdit = () =>{

        setEditModal(!editModal);
    };


    const [deleteModal, setDeleteModal] = useState(false);

    const openAndCloseModalDelete = () =>{

        setDeleteModal(!deleteModal);
    };
/*Estado Modal */   
    
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
/*Estilo Modal */ 



/*Declaramos columnas de la tabla*/
    const columns = [
        { field: 'Id', headerName: 'ID' ,width: 50},
        { field: 'NombreCliente', headerName: 'Nombre Cliente',width: 200 },
        { field: 'Cedula', headerName: 'Cedula',width: 120 },
        { field: 'Membresia', headerName: 'Membresia',width: 100 } ,
        { field: 'Grupo', headerName: 'Grupo',width: 60 } ,
        { field: 'Estatus', headerName: 'Estado',width: 100, type:'boolean'} ,
        { field: 'Credito', headerName: 'Credito',width: 100 ,type: 'number'} ,
        { field: 'FechaIngreso', headerName: 'Fecha Ingreso',width: 200, type: 'dateTime', valueGetter: ({ value }) => value && new Date(value) } ,
/*Declaramos columnas de la tabla*/

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
/* Renderisamos botones en la Tabla */
      ];


      



    return (
        /*Grid*/
        <div style={{ height: 625, width: '100%' }}>
            <h1>Clientes</h1>
            <hr/>
            <br/>

            {/*Alerta*/}
            <ToastContainer />

            <Grid container>
            {/* Agregar Cliente boton*/}
                <Button 
                variant="contained" 
                color="success" 
                startIcon={<AddIcon />}
                onClick={()=> openAndCloseModalAgregar()}
                >
                    Agregar
                </Button>
 
                {/* EAgregar Cliente Modal*/}
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
                            <TextField
                            required
                            id="outlined-required"
                            label="Grupo"
                            name="Grupo"
                            defaultValue=""
                            {...register("Grupo",{required:true})}
                            />
                            {errors.Grupo?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>

                            <TextField
                            required
                            type="number"
                            id="outlined-required"
                            label="Credito"
                            name="Credito"
                            defaultValue=""
                            {...register("Credito",{required:true})}
                            />
                            {errors.Credito?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <TextField
                            type="date"
                            required
                            id="outlined-required"
                            label="Fecha Ingreso"
                            name="FechaIngreso"
                            defaultValue=""
                            {...register("FechaIngreso",{required:true})}
                            />
                            {errors.FechaIngreso?.type ==='required' && "El Campo es requerido."}
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
                            {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estatus}
                                name="Estatus"
                                label="Estado"
                                {...register("Estatus",{required:true})}
                                onChange={handleChangeEstado}
                                >
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                  
                                </Select>
                            </FormControl>
                            {errors.Estado?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/> */}
                            <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Estatus</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={true}
                                    name="Estatus"
                                    value={estatus}
                                    {...register("Estatus",{required:true})}
                                onChange={handleChangeEstado}
                                >
                                    <FormControlLabel value={true}control={<Radio value={true}/>} label="Activo" />
                                    <FormControlLabel value={false}control={<Radio value={false} />} label="Inactivo" />
                                    
                                </RadioGroup>
                            </FormControl>

                            <div align =" right">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="success" type="submit" >Agregar</Button>
                                <Button color="error"  onClick={()=> openAndCloseModalAgregar()}>Cancelar</Button>
                                
                            </ButtonGroup>
                            </div>
                        </form>
                    </Box>
                    </Modal> 

                    {/* Editar Cliente Modal*/}
                    <Modal
                    open={editModal}
                    onClose={openAndCloseModalEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                        <h3> Editar Cliente</h3>
                        <br/>
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
                            <TextField
                            required
                            id="outlined-required"
                            label="Grupo"
                            name="Grupo"
                            defaultValue=""
                            {...register("Grupo",{required:true})}
                            />
                            {errors.Grupo?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>

                            <TextField
                            required
                            id="outlined-required"
                            label="Credito"
                            name="Credito"
                            defaultValue=""
                            inputProps={{ inputMode: 'numeric'}}
                            {...register("Credito",{required:true})}
                            />
                            {errors.Saldo?.type ==='required' && "El Campo es requerido."}
                            <br/>
                            <br/>
                            <TextField
                            type="date"
                            required
                            id="outlined-required"
                            label="Fecha Ingreso"
                            name="FechaIngreso"
                            defaultValue=""
                            {...register("FechaIngreso",{required:true})}
                            />
                            {errors.FechaIngreso?.type ==='required' && "El Campo es requerido."}
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
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estatus}
                                name="Estatus"
                                label="Estado"
                                {...register("Estatus",{required:true})}
                                onChange={handleChangeEstado}
                                >
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                  
                                </Select>
                            </FormControl>
                            {errors.Estado?.type ==='required' && "El Campo es requerido."}
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
 
                    {/* Eliminar Cliente Modal*/}

                    <Modal
                    open={deleteModal}
                    onClose={openAndCloseModalDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                            <h1>Eliminar Cliente</h1>
                            <hr/>
                            <h3>Estas Seguro Que Desea Eliminar el cliente ?</h3>
                            {}

                            <br/>
                            
                            <div align =" right">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="error" onClick={()=>deleteCliente()} >Eliminar</Button>
                                <Button color="info"  onClick={()=> openAndCloseModalDelete()}>Cancelar</Button>
                                
                            </ButtonGroup>
                            </div>
                        
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
