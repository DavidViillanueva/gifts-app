import * as React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useContext } from 'react';
import ColorContext from '../../store/context/colorContext';
 
interface BasicSpeedDialI {
    icon: ReactJSXElement,
    onClick: any 
}

export default function BasicSpeedDial({ icon, onClick}:BasicSpeedDialI) {
    const {color} = useContext(ColorContext);

    return (
            <div 
                className='speedDial_floatingSpace '
                style={{background: color?.primary?.main, color: color?.primary?.contrastText}}
                onClick= { onClick }
            >
                {icon}
            </div>
    );
}