import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { startLogout } from '../../store/actions/auth.actions';
import { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(`/profile/${auth.uid}`);
    handleClose();
  }

  let auth = useSelector((state: RootState) => {
    return state.auth
  })

  const handleLogout = () => {
    dispatch(startLogout())
    handleClose();
  }

  return <div>
    <ul className="nav justify-content-center header">
      <div className="nav-items">
        <li className="nav-item m-4">
          <h2>{t('appName')}</h2>
        </li>
        <li className="nav-item m-4">
          {(!auth.logged) ?
              <Button onClick={() => {navigate('/login')}} variant="contained">{t('button.login')}</Button>
            :
            <>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  variant="contained"
                >
                  ¡{t('labels.hello')} {auth.name}!
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px'}}>
                    <MenuItem onClick={handleProfile}>{t('labels.profile')}</MenuItem>
                    <MenuItem onClick={handleLogout}>{t('labels.logout')}</MenuItem>
                  </Box>
                </Menu>
              </div>
            </>
          }
        </li>
      </div>
    </ul>
  </div>;
};

export default NavBar;
