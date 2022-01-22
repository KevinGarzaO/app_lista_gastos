import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Puntos } from './../images/puntos.svg'

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;

const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
    return (
        <>
            <PuntosArriba />
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path 
                    fillOpacity="1" 
                    d="M0,320L40,277.3C80,235,160,149,240,128C320,107,400,149,480,160C560,171,640,149,720,133.3C800,117,880,107,960,122.7C1040,139,1120,181,1200,165.3C1280,149,1360,75,1400,37.3L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
                </path>
            </Svg>
            <PuntosAbajo />
        </>
    );
}

export default Fondo;