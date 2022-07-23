import api from '../Api/api';


export const getClientes = async () =>{
    return await api.get('/Cliente');       
};

export const getClientesById = async (id) =>{
    return await api.get('/Cliente/id:'+id);       
};

export const postCliente = async (cliente) =>{
    return await api.post('/Cliente',cliente);  
}


