import { addDoc, collection } from 'firebase/firestore';
import {db} from './firebaseConfig'

const agregarGasto = async ({categoria, descripcion, cantidad, fecha, uidUsuario}) =>{
 return await addDoc(collection(db,'gastos'), {
    categoria,
    descripcion,
    cantidad,
    fecha,
    uidUsuario
    })
}

export default agregarGasto;