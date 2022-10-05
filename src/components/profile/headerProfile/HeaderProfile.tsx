import React, { useContext } from 'react';
import profilePic from '../../../assets/profile.png';
import ColorContext from '../../../store/context/colorContext';
import EditProfile from '../editProfile/EditProfile';

interface publicUser {
    name: string,
    profilePicture: string
}

interface HeaderProfileI {
    user: publicUser;
    userId: string;
    editProfile: boolean
}


const HeaderProfile = ({ user, userId, editProfile }: HeaderProfileI) => {
    const { color } = useContext(ColorContext);
    console.log(user);
    return (
        <div className='profile__header' style={{background: color?.primary?.light}}>
            <div className='profile__imgContainer'>
                <img src={user.profilePicture || profilePic} alt='profile'></img>
                <span>{ user.name }</span>
            </div>
            <div className='profile__headerControls'>
                {/* imprimir los iconos de redes sociales asociados */}
                {editProfile &&
                    <EditProfile userId={userId} user={user} />
                }
            </div>
        </div>
    )
}

export default HeaderProfile;