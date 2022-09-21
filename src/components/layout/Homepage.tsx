import { Button } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const { t } = useTranslation(); 
    const navigate = useNavigate();

    return (
    <div className='main-content'>
        <span>{t('labels.yourWishList')}</span>
        <Button 
            variant="contained" 
            color='primary' 
            onClick={ () => { navigate('/register')}}
        >
            {t('button.createAccount')}
        </Button>
    </div>
    ) 
};

export default Homepage;
