import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader'
import Contenedor from './elementos/Contenedor'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditarGastos from './components/EditarGastos'
import GastosPorCategoria from './components/GastosPorCategoria'
import InicioSesion from './components/InicioSesion'
import ListaDeGastos from './components/ListaDeGastos'
import RegistroUsuarios from './components/RegistroUsuarios'

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700','sans-serif']
  }
});

const Index = () => {
  return ( 
    <BrowserRouter>
      <Contenedor>
        <Routes>
         <Route path="/iniciar-sesion" element={<InicioSesion />} />
         <Route path="/crear-cuenta" element={<RegistroUsuarios />} />
         <Route path="/categorias" element={<GastosPorCategoria />} />
         <Route path="/Lista" element={<ListaDeGastos />} />
         <Route path="/editar/:id" element={<EditarGastos />} />
         <Route path="/" element={<App />} />
        </Routes> 
      </Contenedor>
    </BrowserRouter>
  );
}
 
ReactDOM.render(<Index />, document.getElementById('root'));
