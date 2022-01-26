import React, {useState} from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from './../images/plus.svg';
import SelectCategorias from './SelectCategoria';
import DatePicker from './DatePicker';
import agregarGasto from './../firebase/agregarGasto';
import { getUnixTime } from 'date-fns';
import { fromUnixTime } from 'date-fns';
import {useAuth} from './../contexts/AuthContext'

const FormularioGasto = () => {
    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());    
    const uidUsuario = useAuth().usuario.uid;

    const handleChange = (e) =>{
        if(e.target.name === "descripcion"){
            setInputDescripcion(e.target.value);
        }else if(e.target.name === "valor"){
            setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        let  cantidad = parseFloat(inputCantidad).toFixed(2);
        
       
        agregarGasto({
            categoria,
            descripcion: inputDescripcion,
            cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario
        });
    }
    

        return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setCategoria={setCategoria}/>
                <DatePicker fecha={fecha} setFecha={setFecha} />
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripcion del gasto"
                    value={inputDescripcion}
                    onChange={handleChange}
                />

                <InputGrande
                    type="text"
                    name="valor"
                    id="valor"
                    placeholder="$0.00"
                    value={inputCantidad}
                    onChange={handleChange}
                />

                <ContenedorBoton>
                    <Boton as="button" primario conIcono type="submit">
                        Agregar Gasto <IconoPlus />
                    </Boton>
                </ContenedorBoton>
            </div>

        </Formulario>
    );
}

export default FormularioGasto;