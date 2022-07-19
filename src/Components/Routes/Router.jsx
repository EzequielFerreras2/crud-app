import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Clientes from "../Clientes/Clientes";
import Dashboard from "../DashBoard/Dashboard";
import Categoria from "../Categoria/HomeCategoria";


const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="categoria" element={<Categoria />} />
                </Routes>
            </BrowserRouter> 
        </div>
    );
}

export default Router;
