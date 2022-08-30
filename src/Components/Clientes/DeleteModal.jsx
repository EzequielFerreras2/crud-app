import React,{useState,} from 'react';
import { Button,Modal,ButtonGroup} from '@mui/material';
import Box from '@mui/material/Box';
import {getClientes, getClientesById, postCliente,putCliente,deleteClientes} from '../../Services/ClientesAPi'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = (props) => {

    const [deleteModal, setDeleteModal] = useState(false);

    const openAndCloseModalDelete = () =>{

        setDeleteModal(!deleteModal);
    };

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


const deleteCliente =() =>{

    props.SetEliminar();
    deleteClientes(props.Eliminar).then(res =>{
        openAndCloseModalDelete()

        console.log("Cliente Eliminado Correcto!")
        
    })

    
};


    return (
        <>

                    <IconButton 
                    color="error" 
                    aria-label="upload picture" 
                    component="label"
                    onClick={(event) => { deleteCliente()}}
                    >
                    <DeleteIcon />
                    </IconButton>

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
        </>
    );
}

export default DeleteModal;
