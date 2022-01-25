import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton'
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from './../images/registro.svg';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /*100 px*/
    margin-bottom: 1.25rem; /*20 px*/
`;

const RegistroUsuarios = () => {

    const navigate = useNavigate();
    const[correo, setCorreo] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');

    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                setCorreo(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                break;
            
            }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(correo === '' || password === '' || password2 === '' ){
            console.log('Por favor llenar todos los datos');
            return;
        }

        //Comprobamos del lado del cliente que el correo sea valido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            console.log('Por favor ingresa un correo electronico valido');
            return;
        }

       
        if(password !== password2){
            console.log('Las contraseñas no son iguales');
            return;
        }
        
        try{
            await createUserWithEmailAndPassword(auth, correo, password)
            navigate('/');
        }catch(error){
            let mensaje;
            switch(error.code){
                case "auth/weak-password":
                    mensaje = "La contraseña debe de tener al menos 6 caracteres"
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            
            }
            console.log(mensaje);
        }
    }

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

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type="email" name="email" placeholder='Correo Electrónico' onChange={handleChange} value={correo}/>
                <Input type="password" name="password" placeholder='Contraseña' onChange={handleChange} value={password}/>
                <Input type="password" name="password2" placeholder='Repetir Contraseña' onChange={handleChange} value={password2}/>
                
                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>

        </>
    );
}

export default RegistroUsuarios;