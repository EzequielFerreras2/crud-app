import React,{useState,useEffect} from 'react';
import api from '../../Api/api';
import { ClientesI } from '../../Models/ClientesI';
import { DataGrid } from '@mui/x-data-grid';

const Clientes = () => {

    const [cliente, setCliente] = useState([]);

    const getClientes = async () =>{
        await api.get('/Cliente').then(res => {
            console.log(res.data)
            setCliente(res.data)
        }) 

        
    }

    useEffect(() => { 
          getClientes();  
    }, []);


    const columns = [
        { field: 'Id', headerName: 'ID' ,width: 70},
        { field: 'NombreCliente', headerName: 'Nombre Cliente',width: 170 },
        { field: 'Cedula', headerName: 'Cedula',width: 170 },
        { field: 'Membresia', headerName: 'Membresia',width: 170 } 
      ];


      



    return (
        <div style={{ height: 600, width: '100%' }}>
            <h1>Clientes</h1>
            <hr/>

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
