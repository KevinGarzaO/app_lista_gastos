import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton'
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from './../images/registro.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /*100 px*/
    margin-bottom: 1.25rem; /*20 px*/
`;


const RegistroUsuarios = () => {
    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario>
                <Svg />
                <Input type="email" name="email" placeholder='Correo Electrónico'/>
                <Input type="password" name="password" placeholder='Contraseña'/>
                <Input type="password" name="password" placeholder='Repetir Contraseña'/>
                
                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Crear Cuenta</Boton>
                </ContenedorBoton>
                
                
            </Formulario>

        </>
    );
}

export default RegistroUsuarios;