import React, { useContext, useState } from 'react';
import profilePic from '../../../assets/profile.png';
import ColorContext from '../../../store/context/colorContext';
import EditProfile from '../editProfile/EditProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [openCopy, setOpenCopy] = useState(false);

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
                        <Tooltip title={t('labels.instagram') || ''}>
                            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="instagram" size="large">
                                    <InstagramIcon fontSize="inherit"/>
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    { user.twitter &&
                        <Tooltip title={t('labels.twitter') || ''}>
                            <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="twitter" size="large">
                                    <TwitterIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    { user.cafecito &&
                        <Tooltip title={t('labels.cafecito') || ''}>
                            <a href={user.cafecito} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="coffe" size="large" onClick={() => {}}>
                                    <CoffeeIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    {user.facebook &&
                        <Tooltip title={t('labels.facebook') || ''}>
                            <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="facebook" size="large" onClick={() => {}}>
                                    <FacebookIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                </div>
                <div>
                    <ClickAwayListener onClickAway={() => { setOpenCopy(false)}}>
                        <Tooltip 
                            title={t('labels.shareProfile') || ''}
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => { setOpenCopy(false)}}
                            open={openCopy}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                        >
                            <IconButton aria-label="facebook" size="large" onClick={() => {
                                setOpenCopy(true);
                                navigator.clipboard.writeText(t('labels.messageProfile', { url:  window.location.href }));
                            }}>
                                <ShareIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </ClickAwayListener>
                    {editProfile &&
                        <EditProfile userId={userId} user={user} />
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderProfile;