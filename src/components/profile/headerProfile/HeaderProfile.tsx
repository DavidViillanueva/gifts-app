import React, { useContext } from 'react';
import profilePic from '../../../assets/profile.png';
import ColorContext from '../../../store/context/colorContext';
import EditProfile from '../editProfile/EditProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton, Tooltip } from '@mui/material';

interface publicUser {
    name: string;
    profilePicture: string;
    cafecito: string;
    facebook: string;
    instagram: string;
    twitter: string;
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
                <div className='profile__headerControlsSocial'>
                    { user.instagram &&
                        <Tooltip title="Instagram">
                            <IconButton aria-label="instagram" size="large" onClick={() => {}}>
                                <InstagramIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                    { user.twitter &&
                        <Tooltip title="Twitter">
                            <IconButton aria-label="twitter" size="large" onClick={() => {}}>
                                <TwitterIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                    { user.cafecito &&
                        <Tooltip title="Cafecito">
                            <IconButton aria-label="coffe" size="large" onClick={() => {}}>
                                <CoffeeIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                    {user.facebook &&
                        <Tooltip title="Facebook">
                            <IconButton aria-label="facebook" size="large" onClick={() => {}}>
                                <FacebookIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                </div>
                <div>
                    {editProfile &&
                        <EditProfile userId={userId} user={user} />
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderProfile;