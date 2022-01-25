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
import { Helmet } from "react-helmet";
import favicon from './images/logo.png'
import Fondo from './elementos/fondo'
import { AuthProvider } from './contexts/AuthContext';
import RutaPrivada from './components/RutaPrivada'

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/iniciar-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<RegistroUsuarios />} />

              <Route path="/categorias" element={
                <RutaPrivada>
                  <GastosPorCategoria />
                </RutaPrivada>
              } />

              <Route path="/Lista" element={
                <RutaPrivada>
                  <ListaDeGastos />
                </RutaPrivada>
              } />

              <Route path="/editar/:id" element={
                <RutaPrivada>
                  <EditarGastos />
                </RutaPrivada>
              } />

              <Route path="/" element={
                <RutaPrivada>
                  <App />
                </RutaPrivada>
              } />

            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>
      <Fondo />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
