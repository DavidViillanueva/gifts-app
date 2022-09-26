import { Button, CircularProgress, FormControl, FormHelperText, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../configs/colors';
import { types } from '../../../configs/types';
import { startSettingColorThemePublicUser, startUpdatingProfile } from '../../../store/actions/auth.actions';
import ColorContext from '../../../store/context/colorContext';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useFormik } from 'formik';
import { RootState } from '../../../store/store';



const EditProfileForm = ({ userid }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { dispatchColor } = useContext(ColorContext);
    const [color, setColor] = useState('');
    
    
    const formik = useFormik({
        initialValues: {
            instagram: '',
            twitter: '',
            cafecito: '',
            facebook: ''
        },
        onSubmit: values => {
            dispatch(startUpdatingProfile(userid, values))
        },
    });
    const validFacebook = formik.values.facebook && !formik.values.facebook.includes('facebook.com/');
    const validInstagram = formik.values.instagram && !formik.values.instagram.includes('www.instagram.com/');
    const validTwitter = formik.values.twitter && !formik.values.twitter.includes('twitter.com/');
    const validCafecito = formik.values.cafecito && !formik.values.cafecito.includes('cafecito.app/');

    let userData = useSelector((state: RootState) => {
        return state.auth
    })

    const handleColorChange = (e: any) => {
        if (e.target.value) {
            setColor(e.target.value);
            dispatchColor({ type: types.uiSetProfileColor, payload: colors[e.target.value] });
            dispatch(startSettingColorThemePublicUser(userid, colors[e.target.value]));
        }
    }
    return (
        <form className='form__column'>
            <FormControl className='form__control'>
                <InputLabel id="colorSelect-label">{t('labels.form.color')}</InputLabel>
                <Select
                    labelId="colorSelect-label"
                    id="colorSelect"
                    value={color}
                    label={t('labels.form.color')}
                    onChange={handleColorChange}
                >
                    <MenuItem value={'blue'}>{t('labels.form.colorBlue')}</MenuItem>
                    <MenuItem value={'red'}>{t('labels.form.colorRed')}</MenuItem>
                    <MenuItem value={'pink'}>{t('labels.form.colorPink')}</MenuItem>
                    <MenuItem value={'cyan'}>{t('labels.form.colorCyan')}</MenuItem>
                </Select>
            </FormControl>
            <FormControl className='form__control' variant="outlined">
                <InputLabel htmlFor="instagramInput">{t('labels.form.instagramInput')}</InputLabel>
                <OutlinedInput
                    id="instagramInput"
                    label={t('labels.form.instagramInput')}
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    name='instagram'
                    color='primary'
                    endAdornment={
                        <InputAdornment position="end">
                            <InstagramIcon />
                        </InputAdornment>
                    }
                />
                {validInstagram && 
                    <FormHelperText error id="instagramInput">Error</FormHelperText>
                }
            </FormControl>
            <FormControl className='form__control' variant="outlined">
                <InputLabel htmlFor="twitterInput">{t('labels.form.twitterInput')}</InputLabel>
                <OutlinedInput
                    id="twitterInput"
                    label={t('labels.form.twitterInput')}
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    name='twitter'
                    color='primary'
                    endAdornment={
                        <InputAdornment position="end">
                            <TwitterIcon />
                        </InputAdornment>
                    }
                />
                {validTwitter && 
                    <FormHelperText error id="twitterInput">Error</FormHelperText>
                }
            </FormControl>
            <FormControl className='form__control' variant="outlined">
                <InputLabel htmlFor="cafecitoInput">{t('labels.form.cafecitoInput')}</InputLabel>
                <OutlinedInput
                    id="cafecitoInput"
                    label={t('labels.form.cafecitoInput')}
                    value={formik.values.cafecito}
                    onChange={formik.handleChange}
                    name='cafecito'
                    color='primary'
                    endAdornment={
                        <InputAdornment position="end">
                            <CoffeeIcon />
                        </InputAdornment>
                    }
                />
                {validCafecito && 
                    <FormHelperText error id="cafecitoInput">Error</FormHelperText>
                }
            </FormControl>
            <FormControl className='form__control' variant="outlined">
                <InputLabel htmlFor="facebookInput">{t('labels.form.facebookInput')}</InputLabel>
                <OutlinedInput
                    id="facebookInput"
                    label={t('labels.form.facebookInput')}
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    name='facebook'
                    color='primary'
                    endAdornment={
                        <InputAdornment position="end">
                            <FacebookIcon />
                        </InputAdornment>
                    }
                />
                {validFacebook && 
                    <FormHelperText error id="facebookInput">Error</FormHelperText>
                }
            </FormControl>
            {userData.loading 
                ?
                    <div className='form__centerloading'>
                        <CircularProgress color="primary" size={30}/>
                    </div>
                :
                    <Button
                        variant="contained"
                        onClick={ () => formik.handleSubmit() }
                        color='primary'
                        disabled={ validCafecito as boolean || validFacebook as boolean || validInstagram  as boolean|| validTwitter as boolean }
                    >
                        {t('button.save')}
                    </Button>
            } 
        </form>
    )
}

export default EditProfileForm