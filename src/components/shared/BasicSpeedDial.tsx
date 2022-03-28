import * as React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
 
interface BasicSpeedDialI {
    icon: ReactJSXElement, 
    color? : 'primary' | 'secondary',
    onClick: any 
}

export default function BasicSpeedDial({ icon, color = 'primary', onClick}:BasicSpeedDialI) {

    const colors = {
        'primary': '#2b6cb0',
        'secondary': '#3182ce85'
    }

    return (
            <div 
                className='speedDial_floatingSpace'
                style={{background: colors[color]}}
                onClick= { onClick }
            >
                {icon}
            </div>
    );
}