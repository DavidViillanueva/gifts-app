import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { FcExpand } from "react-icons/fc";
import { startLogout } from '../../store/actions/auth.actions';

const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let auth  = useSelector((state: RootState) => {
    return state.auth
  })

  const handleLogout = () => {
    dispatch( startLogout() )
  }

  return <div>
  <ul className="nav justify-content-center header">
      <div className="nav-items">
        <li className="nav-item m-4">
            <h2>{t('appName')}</h2>
        </li>
        <li className="nav-item m-4">
            {(!auth.logged) ?
              <Link to="/login">
                <Button colorScheme='blue'>{t('button.login')}</Button>
              </Link>
            :
              <>
                <Menu>
                  <MenuButton as={Button} rightIcon={<FcExpand />}>¡{t('labels.hello')} {auth.name}!</MenuButton>
                  <Portal>
                    <MenuList>
                      <MenuItem>{t('labels.profile')}</MenuItem>
                      <MenuItem
                        onClick={ handleLogout }
                      >{t('labels.logout')}</MenuItem>
                    </MenuList>
                  </Portal>
              </Menu>
              </>
            }

        </li>
      </div>
  </ul>
</div>;
};

export default NavBar;
