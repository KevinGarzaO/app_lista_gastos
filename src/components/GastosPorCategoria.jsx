import React from 'react';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './../elementos/Header'
import Helmet from 'react-helmet';

const GastosPorCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por categoria</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Gastos por categoria</Titulo>
                </ContenedorHeader>
            </Header>
        </>
    );
}

export default GastosPorCategoria;