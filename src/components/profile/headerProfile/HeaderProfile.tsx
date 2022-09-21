import { IconButton } from '@mui/material';
import React from 'react';
import profilePic from '../../../assets/profile.png';
import EditIcon from '@mui/icons-material/Edit';

interface publicUser {
    name: string
}
const HeaderProfile = ({ user }: { user: publicUser}) => {
    console.log(user);
    return (
        <div className='profile__header'>
            <div className='profile__imgContainer'>
                <img src={profilePic} alt='profile'></img>
                <span>{ user.name }</span>
            </div>
            <div className='profile__headerControls'>
                {/* imprimir los iconos de redes sociales asociados */}
                <IconButton aria-label="edit"  size="small">
                    <EditIcon  fontSize="inherit"/>
                </IconButton>
            </div>
        </div>
    )
}

export default HeaderProfile;