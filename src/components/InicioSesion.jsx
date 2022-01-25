import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from './../images/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/Alerta';


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /*100 px*/
    margin-bottom: 1.25rem; /*2 px*/
`;

const InicioSesion = () => {
    const navigate = useNavigate();
    const[correo, setCorreo] = useState('');
    const[password, setPassword] = useState('');
    const[estadoAlerta, setEstadoAlerta] = useState(false);
    const[alerta, setAlerta] = useState({});

    const handleChange = (e) =>{
        if(e.target.name === 'email'){
            setCorreo(e.target.value);
        }else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});

        if(correo === '' || password === ''){
            setEstadoAlerta(true);
            setAlerta({
                tipo: "error",
                mensaje: "Por favor llenar todos los datos"
            });
          
            return;
        }

        //Comprobamos del lado del cliente que el correo sea valido.
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            setEstadoAlerta(true);
            setAlerta({
                tipo: "error",
                mensaje: "Por favor ingresa un correo electronico valido"
            });
            return;
        }

       
        try{
            await signInWithEmailAndPassword(auth, correo, password)
            navigate('/');
        }catch(error){
            console.log(error);
            let mensaje;
            switch(error.code){
                case "auth/wrong-password":
                    mensaje = "La contraseña no es correcta"
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No existe usuario favor de volver a intentar.'
                    break;
                // case 'auth/invalid-email':
                //     mensaje = 'El correo electrónico no es válido.'
                //     break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            
            }
            setEstadoAlerta(true);
            setAlerta({
                tipo: "error",
                mensaje: mensaje
            });
        }
    }

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

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type="email" name="email" placeholder='Correo Electrónico' value={correo} onChange={handleChange}/>
                <Input type="password" name="password" placeholder='Contraseña' value={password} onChange={handleChange}/>
                

                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>


            </Formulario>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}/>

        </>
    );
}

export default InicioSesion;