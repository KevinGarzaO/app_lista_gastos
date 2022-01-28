import React from 'react';
import { Header, Titulo } from './../elementos/Header'
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import { useAuth } from '../contexts/AuthContext';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import  {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
}  from '../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria'
import convertirAMoneda from './../functions/convertirAMoneda'
import {ReactComponent as IconoEditar} from './../images/editar.svg'
import {ReactComponent as IconoBorrar} from './../images/borrar.svg'
import { Link } from 'react-router-dom';
import Boton from './../elementos/Boton'

const ListaDeGastos = () => {
    const {usuario} = useAuth();
    const [gastos] = useObtenerGastos();
   
    
    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>

            <Lista>
                {gastos.map((gasto) =>{
                    return(
                        <ElementoLista key={gasto.id}>
                            <Categoria>
                                <IconoCategoria nombre={gasto.categoria} />
                                {gasto.categoria}
                            </Categoria>

                            <Descripcion>
                                {gasto.descripcion}
                            </Descripcion>
                            <Valor>
                                {convertirAMoneda(gasto.cantidad)}
                            </Valor>

                            <ContenedorBotones>
                                <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                    <IconoEditar />
                                </BotonAccion>
                                <BotonAccion>
                                    <IconoBorrar />
                                </BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                    );
                })}

                <ContenedorBotonCentral>
                    <BotonCargarMas>
                        Cargar más
                    </BotonCargarMas>
                </ContenedorBotonCentral>


                {gastos.length === 0  && 
                <ContenedorSubtitulo>
                    <Subtitulo>
                        No hay gastos por mostrar
                        <Boton as={Link} to="/">Agregar gasto</Boton>
                    </Subtitulo>
                </ContenedorSubtitulo>
                }
            </Lista>

            <BarraTotalGastado />
        </>
    );
}

export default ListaDeGastos