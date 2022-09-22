import React from 'react';
import profilePic from '../../../assets/profile.png';
import EditProfile from '../editProfile/EditProfile';

interface publicUser {
    name: string
}

interface HeaderProfileI {
    user: publicUser;
    userId: string;
    editProfile: boolean
}


const HeaderProfile = ({ user, userId, editProfile }: HeaderProfileI) => {
    console.log(user);
    return (
        <div className='profile__header'>
            <div className='profile__imgContainer'>
                <img src={profilePic} alt='profile'></img>
                <span>{ user.name }</span>
            </div>
            <div className='profile__headerControls'>
                {/* imprimir los iconos de redes sociales asociados */}
                {editProfile &&
                    <EditProfile userId={userId}/>
                }
            </div>
        </div>
    )
}

export default HeaderProfile;