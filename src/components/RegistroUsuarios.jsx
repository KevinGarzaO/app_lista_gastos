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
import Alerta from '../elementos/Alerta';

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
    const[estadoAlerta, setEstadoAlerta] = useState(false);
    const[alerta, setAlerta] = useState({});

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
        setEstadoAlerta(false);
        setAlerta({});

        if(correo === '' || password === '' || password2 === '' ){
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

       
        if(password !== password2){
            setEstadoAlerta(true);
            setAlerta({
                tipo: "error",
                mensaje: "Las contrase??as no son iguales"
            });
            return;
        }
        
        try{
            await createUserWithEmailAndPassword(auth, correo, password)
            navigate('/');
        }catch(error){
            let mensaje;
            switch(error.code){
                case "auth/weak-password":
                    mensaje = "La contrase??a debe de tener al menos 6 caracteres"
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electr??nico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electr??nico no es v??lido.'
                    break;
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
                <Input type="email" name="email" placeholder='Correo Electr??nico' onChange={handleChange} value={correo}/>
                <Input type="password" name="password" placeholder='Contrase??a' onChange={handleChange} value={password}/>
                <Input type="password" name="password2" placeholder='Repetir Contrase??a' onChange={handleChange} value={password2}/>
                
                <ContenedorBoton>
                    <Boton as="button" primario type='submit'>Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta}/>

        </>
    );
}

export default RegistroUsuarios;