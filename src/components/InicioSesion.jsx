import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from './../images/login.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /*100 px*/
    margin-bottom: 1.25rem; /*2 px*/
`;

const InicioSesion = () => {
    return (
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario>
                <Svg />
                <Input type="email" name="email" placeholder='Correo Electrónico' />
                <Input type="password" name="password" placeholder='Contraseña' />
                

                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>


            </Formulario>

        </>
    );
}

export default InicioSesion;