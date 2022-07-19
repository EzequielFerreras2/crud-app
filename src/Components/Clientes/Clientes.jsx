import React,{useState,useEffect} from 'react';
import api from '../../Api/api';
import { ClientesI } from '../../Models/ClientesI';

const Clientes = () => {
    const [cliente, setcliente] = useState([]);

    const getClientes = async () =>{

        await api.get('/Cliente').then(res => {
            const cliente = res.data;
            console.log(cliente)
            setcliente({cliente});
        }) 
    }

    useEffect(() => { 
          getClientes();  
    }, []);


    // const columns = [
    //     { field: 'id', headerName: 'ID' },
    //     { field: 'id', headerName: 'ID' },
    //     { field: 'id', headerName: 'ID' },
    //     { field: 'id', headerName: 'ID' },
    //     { field: 'id', headerName: 'ID' },
        
        
    //   ];






    return (
        <div>
            <h1>Clientes</h1>
        </div>
    );
}

export default Clientes;
