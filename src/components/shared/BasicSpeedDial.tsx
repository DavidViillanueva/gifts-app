import * as React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useTheme } from '@mui/material';
 
interface BasicSpeedDialI {
    icon: ReactJSXElement, 
    color? : 'primary' | 'secondary',
    onClick: any 
}

export default function BasicSpeedDial({ icon, color = 'primary', onClick}:BasicSpeedDialI) {

    // const colors = {
    //     'primary': '#2b6cb0',
    //     'secondary': '#3182ce85'
    // }
    const theme = useTheme()
    console.log( theme )

    return (
            <div 
                className='speedDial_floatingSpace '
                style={{background: theme.palette.primary.main}}
                onClick= { onClick }
            >
                {icon}
            </div>
    );
}