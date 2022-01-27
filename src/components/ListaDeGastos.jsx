import React from 'react';
import { Header, Titulo } from './../elementos/Header'
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import { useAuth } from '../contexts/AuthContext';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';

const ListaDeGastos = () => {
    const {usuario} = useAuth();
    const [gastos] = useObtenerGastos();
   

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>

            <BarraTotalGastado />
        </>
    );
}

export default ListaDeGastos