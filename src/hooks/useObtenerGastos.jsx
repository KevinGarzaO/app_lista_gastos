import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from 'firebase/firestore';


const useObtenerGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [ultimoGasto, setUltimoGasto] = useState(null);
    const [hayMasPorCargar, setHayMasPorCargar] = useState(false);

    const { usuario } = useAuth()

    const obtenerMasGastos = () => {
        const masGastos = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        onSnapshot(masGastos, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

                setGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return { ...gasto.data(), id: gasto.id }
                })))
            } else {
                setHayMasPorCargar(false);
            }
        }, error =>{console.log(error)});
    }


    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsusbcribe = onSnapshot(consulta, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                setHayMasPorCargar(true);
            } else {
                setHayMasPorCargar(false);
            }

            setGastos(snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id }
            }));
        })

        return unsusbcribe;
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}

export default useObtenerGastos;