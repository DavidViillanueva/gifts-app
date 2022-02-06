import { Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Homepage = () => {

    const { t } = useTranslation(); 

    return (
    <div className='main-content'>
        <span>{t('labels.yourWishList')}</span>
        <Link to="/register">
            <Button colorScheme='blue'>{t('button.createAccount')}</Button>
        </Link>
    </div>
    ) 
};

export default Homepage;
