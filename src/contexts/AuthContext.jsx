import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

//Creamos el contexto
const AuthContxt = React.createContext();

//Hook para accerder al contexto
const useAuth = () => {
    return useContext(AuthContxt);
}


const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);

    //Efecto para ejecutar la comprobación una sola vez
    useEffect(() =>{
        //Comprobamos si hay un usario.
       const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) =>{
            setUsuario(usuario);
            setCargando(false);
        });

        return cancelarSuscripcion;
    }, []);


    return (
        <AuthContxt.Provider value={{ usuario }}>
            {!cargando && children}
        </AuthContxt.Provider>
    );
}

export { AuthProvider, AuthContxt, useAuth };