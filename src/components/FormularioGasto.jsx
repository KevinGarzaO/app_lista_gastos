import React, { useState } from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from './../images/plus.svg';
import SelectCategorias from './SelectCategoria';
import DatePicker from './DatePicker';
import agregarGasto from './../firebase/agregarGasto';
import { getUnixTime } from 'date-fns';
import { fromUnixTime } from 'date-fns';
import { useAuth } from './../contexts/AuthContext'
import Alerta from './../elementos/Alerta'

const FormularioGasto = () => {
    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({})
    const uidUsuario = useAuth().usuario.uid;

    const handleChange = (e) => {
        if (e.target.name === "descripcion") {
            setInputDescripcion(e.target.value);
        } else if (e.target.name === "valor") {
            setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(2);


        if (inputDescripcion !== '' && cantidad !== '') {
            if (cantidad) {
                agregarGasto({
                    categoria,
                    descripcion: inputDescripcion,
                    cantidad,
                    fecha: getUnixTime(fecha),
                    uidUsuario
                }).then(() => {
                    setCategoria('hogar');
                    setInputDescripcion('');
                    setInputCantidad('');
                    setFecha(new Date());

                    setEstadoAlerta(true);
                    setAlerta({
                        tipo: 'exito',
                        mensaje: 'El gasto fue agregado correctamente'
                    })
                }).catch((error) =>{
                    setEstadoAlerta(true);
                    setAlerta({
                        tipo: 'error',
                        mensaje: 'Hubo un problema al intentar guradar tu gasto '
                    })
                })
            } else {
                setEstadoAlerta(true);
                setAlerta({
                    tipo: 'error',
                    mensaje: 'El valor que ingraste no es correto'
                })
            }
        } else {
            setEstadoAlerta(true);
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            })
        }


    }


    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
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

            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
        </Formulario>
    );
}

export default FormularioGasto;