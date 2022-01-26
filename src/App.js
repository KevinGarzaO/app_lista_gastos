import React from 'react';
import { Helmet } from 'react-helmet';
import Boton from './elementos/Boton';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elementos/Header'
import BotonCerrarSesion from './components/BotonCerrarSesion';
import FormularioGasto from './components/FormularioGasto';
import BarraTotalGastado from './components/BarraTotalGastado';

const App = () => {
  return ( 
    <>
      <Helmet>
          <title>Agregar gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/Lista">Lista de gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FormularioGasto />

      <BarraTotalGastado />
    </>
  );
}
 
export default App;