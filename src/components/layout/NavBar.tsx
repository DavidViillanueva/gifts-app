import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const { t } = useTranslation();
  return <div>
  <ul className="nav justify-content-center header">
      <div className="nav-items">
        <li className="nav-item m-4">
            <h2>{t('appName')}</h2>
        </li>
        <li className="nav-item m-4">
            <Button colorScheme='blue'>{t('button.login')}</Button>
        </li>
      </div>
  </ul>
</div>;
};

export default NavBar;
