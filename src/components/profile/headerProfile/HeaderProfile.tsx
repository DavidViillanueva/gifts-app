import React, { useContext, useState, useEffect } from 'react';
import profilePic from '../../../assets/profile.png';
import ColorContext from '../../../store/context/colorContext';
import EditProfile from '../editProfile/EditProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Button, Checkbox, CircularProgress, ClickAwayListener, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startSettingFavoriteProfile } from '../../../store/actions/auth.actions';
import Swal from 'sweetalert2';
import { RootState } from '../../../store/store';
import { deleteProfile } from '../../../utils/profileUtils';
import { useFlags } from 'flagsmith/react';
import { userTypes } from '../../../utils/constants';

interface publicUser {
    name: string;
    profilePicture: string;
    cafecito: string;
    facebook: string;
    instagram: string;
    twitter: string;
    favoriteProfiles: any[];
}

interface HeaderProfileI {
    user: publicUser;
    userId: string;
    editProfile: boolean;
    typeUser: string;
}


const HeaderProfile = ({ user, userId, editProfile, typeUser }: HeaderProfileI) => {
    const { color } = useContext(ColorContext);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [openCopy, setOpenCopy] = useState(false);
    const { profileId } = useParams();
    const navigate = useNavigate();
    const flags = useFlags(['favorites_profiles', 'delete_profile']);
    const ft_favorites_profiles = flags.favorites_profiles;
    const ft_delete_profile = flags.delete_profile;

    // TODO podria pasarse como prop porque el store se lee en Profile
    let auth = useSelector((state: RootState) => {
        return state.auth
    })


    const [favoriteProfile, setfavoriteProfile] = useState<boolean>(false)
    const [loadingDeleteProfile, setLoadingDeleteProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFavoriteRedirect = (favoriteUuid: string) => {
        navigate(`/profile/${favoriteUuid}`);
        handleClose();
    };

    const handleFavoriteToggle = () => {
        dispatch(startSettingFavoriteProfile(userId, profileId || '', user.name));
        setfavoriteProfile(!favoriteProfile);
    };

    useEffect(() => {
        auth?.favoriteProfiles?.forEach(favoriteProfile => {
            if (favoriteProfile.uuid === profileId)
                setfavoriteProfile(true)
        })
        // eslint-disable-next-line
    }, [auth]);

    const handleInfoPopup = () => {
        Swal.fire({
            title: 'Agregar favoritos',
            text: 'Pedile el perfil a tu amigo y hace click en el corazon (en la esquina superior izquierda) para agregarlo como favorito!',
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
    }

    const handleDeleteProfile = () => {
        if (profileId) {
            setLoadingDeleteProfile(true);
            deleteProfile(profileId)
                .then(value => {
                    setLoadingDeleteProfile(false);
                    navigate('/');
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Ocurrio un error',
                        text: 'Por favor intentelo nuevamente, si el error persiste comuniquese con el personal tecnico',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                    setLoadingDeleteProfile(false);
                });
        }

    }
    return (
        <div className='profile__header' style={{ background: color?.primary?.light }}>
            <div className='profile__headerControls'>

                {(!editProfile && userId) &&
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        onChange={handleFavoriteToggle}
                        checked={favoriteProfile}
                    />
                }
                {editProfile && ft_favorites_profiles.enabled &&
                    <>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="primary"
                        >
                            Favoritos
                        </Button>
                        <Menu
                            id="basic-menu"
                            open={open}
                            onClose={handleClose}
                            anchorEl={anchorEl}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {user?.favoriteProfiles?.map(favoriteProfile => (
                                <MenuItem
                                    key={`${favoriteProfile.name}-${favoriteProfile.uuid}`}
                                    onClick={() => { handleFavoriteRedirect(favoriteProfile.uuid) }}
                                >
                                    {favoriteProfile.name}
                                </MenuItem>
                            ))}
                            {!user?.favoriteProfiles &&
                                <MenuItem onClick={handleInfoPopup}>Agrega el perfil de tus amigos como favorito!</MenuItem>
                            }
                        </Menu>
                    </>
                }
                {ft_delete_profile.enabled && typeUser === userTypes.admin &&
                    <div>
                        {loadingDeleteProfile ?
                            <div className='form__centerloading'>
                                <CircularProgress color="primary" size={30} />
                            </div>
                            :
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleDeleteProfile}
                                color="primary"
                            >
                                Borrar perfil
                            </Button>
                        }
                    </div>
                }
            </div>
            <div className='profile__imgContainer'>
                <img src={user.profilePicture || profilePic} alt='profile'></img>
                <span>{user.name}</span>
            </div>
            <div className='profile__headerControls'>
                {/* imprimir los iconos de redes sociales asociados */}
                <div className='profile__headerControlsSocial'>
                    {user.instagram &&
                        <Tooltip title={t('labels.instagram') || ''}>
                            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="instagram" size="large">
                                    <InstagramIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    {user.twitter &&
                        <Tooltip title={t('labels.twitter') || ''}>
                            <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="twitter" size="large">
                                    <TwitterIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    {user.cafecito &&
                        <Tooltip title={t('labels.cafecito') || ''}>
                            <a href={user.cafecito} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="coffe" size="large" onClick={() => { }}>
                                    <CoffeeIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                    {user.facebook &&
                        <Tooltip title={t('labels.facebook') || ''}>
                            <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="facebook" size="large" onClick={() => { }}>
                                    <FacebookIcon fontSize="inherit" />
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                </div>
                <div>
                    <ClickAwayListener onClickAway={() => { setOpenCopy(false) }}>
                        <Tooltip
                            title={t('labels.shareProfile') || ''}
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => { setOpenCopy(false) }}
                            open={openCopy}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                        >
                            <IconButton aria-label="facebook" size="large" onClick={() => {
                                setOpenCopy(true);
                                navigator.clipboard.writeText(t('labels.messageProfile', { url: window.location.href }));
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