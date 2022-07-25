
import api from '../Api/api';

/*Todos los Clientes*/
export const getClientes = async () =>{

    return (await api.get('/Cliente').catch(function (error) {alert(error.response.data)}) )   
};

/*Cliente Por Id*/
export const getClientesById = async (id) =>{

    return (await api.get(`/Cliente/Id:`+id).catch(function (error) {alert(error.response.data);}) )
};

/*Agregar los Cliente*/
export const postCliente = async (cliente) =>{

    try
    {
        return (await api.post('/Cliente',cliente).catch(function (error) {alert(error.response.data); })  )
    }

    catch
    {
        alert("error");
    }
    
};

/*Editar Los Cliente*/
export const putCliente = async (id,cliente) =>
{

    try 
    {   
        return(await api.put('/Cliente/id:'+id,cliente).catch(function (error) { console.log(cliente) }));
    } 

    catch
    {
        alert("error");
    }

};

/*Eliminar los Cliente*/
export const DeleteClientes = async (id) =>{

    return (await api.delete(`/Cliente/Id:`+id).catch(function (error) {alert(error.response.data);}) )
};