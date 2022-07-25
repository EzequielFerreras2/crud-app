
import api from '../Api/api';




export const getClientes = async () =>{


    return (await api.get('/Cliente').catch(function (error) {
        alert(error.response.data)
      })   
      )   
};

export const getClientesById = async (id) =>{
    return (
        await api.get(`/Cliente/Id:`+id).catch(function (error) {
        console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert(error.response.data);
      console.log(error.toJSON());
      })   
      
      
    
    )
};


export const postCliente = async (cliente) =>{

    try{

        return (
        
            await api.post('/Cliente',cliente).catch(function (error) {
           
                alert(error.response.data);
          })  )
    }
    catch{

        alert("error");

    }
    
};

export const putCliente = async (id,cliente) =>
{

 try {   
        return(

            await api.put('/Cliente/id:'+id,cliente).catch(function (error) { console.log("hola",cliente)   })
            
        );
    
       
    } 

    catch{

        alert("error");

    }

    
};

