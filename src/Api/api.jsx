import axios from 'axios';

export default axios.create({
  baseURL: `https://tiendaapp.azurewebsites.net/`
  /*baseURL: `https://localhost:7137/` */
});