import React from 'react';
import {ReactComponent as IconoComida} from './../images/cat_comida.svg';
import {ReactComponent as IconoCompras} from './../images/cat_compras.svg';
import {ReactComponent as IconoCuentasYPagos} from './../images/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoDiversion} from './../images/cat_diversion.svg';
import {ReactComponent as IconoHogar} from './../images/cat_hogar.svg';
import {ReactComponent as IconoRopa} from './../images/cat_ropa.svg';
import {ReactComponent as IconoSaludEHigiene} from './../images/cat_salud-e-higiene.svg';
import {ReactComponent as IconoTransporte} from './../images/cat_transporte.svg';

const IconoCategoria = ({nombre}) => {
    switch(nombre){
        case 'comida':
            return <IconoComida />
        case 'cuentas y pagos':
            return <IconoCuentasYPagos />
        case 'hogar':
            return <IconoHogar />
        case 'transporte':
            return <IconoTransporte />
        case 'salud e higiene':
            return <IconoSaludEHigiene />
        case 'compras':
            return <IconoCompras />
        case 'diversion':
            return <IconoDiversion />
        case 'ropa':
            return <IconoRopa />
        default:
            break;
    }
}
 
export default IconoCategoria;