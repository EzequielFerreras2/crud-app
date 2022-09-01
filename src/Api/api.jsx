import axios from 'axios';

export default axios.create({
  baseURL: `https://localhost:7137/`
  /*baseURL: `https://localhost:7137/` */
  /*baseURL: `https://tiendaapp.azurewebsites.net/` */
});