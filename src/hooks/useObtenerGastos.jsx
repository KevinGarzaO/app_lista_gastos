import {useState, useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit } from 'firebase/firestore';


const useObtenerGastos = () => {
    const [gastos, setGastos] = useState([])
    const {usuario} = useAuth()


    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const  unsusbcribe = onSnapshot(consulta, (snapshot) =>{
            setGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        })

        return unsusbcribe;
    }, [usuario]);

    return [gastos];
}
 
export default useObtenerGastos;