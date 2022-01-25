import React, {useState} from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from './../images/plus.svg'

const FormularioGasto = () => {
    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    
    const handleChange = (e) =>{
        if(e.target.name === "descripcion"){
            setInputDescripcion(e.target.value);
        }else if(e.target.name === "valor"){
            setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    return (
        <Formulario>
            <ContenedorFiltros>
                <p>Select</p>
                <p>Day picker</p>
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