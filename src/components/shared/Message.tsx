import React from 'react'

interface MessageI {
    message: string;
    subtitle?: string
}

const Message = ({ message, subtitle }: MessageI) => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            height: '200px',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h3>{message}</h3>
            <h6>{subtitle}</h6>
        </div>
    )
}

export default Message