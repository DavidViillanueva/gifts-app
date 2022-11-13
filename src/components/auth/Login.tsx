import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLoginWithEmailPassword } from '../../store/actions/auth.actions';
import { RootState } from '../../store/store';
import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    let userData = useSelector((state: RootState) => {
        return state.auth
    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(startLoginWithEmailPassword(values.email, values.password));
            if (userData.uid)
                navigate(`/profile/${userData.uid}`);
        },
    });

    return (
        <div className='form__container-centered'>
            <form onSubmit={formik.handleSubmit} className='form__column'>
                <span>{t('labels.login')}</span>
                <FormControl className="form__control">
                    <InputLabel htmlFor="standard-adornment-password">{t('labels.form.email')}</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        color='primary'
                    />
                </FormControl>
                <FormControl className="form__control">
                    <InputLabel htmlFor="standard-adornment-password">{t('labels.form.password')}</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        color='primary'
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { setShowPassword(!showPassword); }}
                                onMouseDown={(e) => { e.preventDefault(); }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className='form__buttons'>
                    {userData.loading 
                    ?
                        <CircularProgress color="primary" size={30}/>
                    :
                        <Button
                            variant="contained"
                            onClick={ (e) => { e.preventDefault(); formik.handleSubmit() }}
                            color='primary'
                            type='submit'
                        >
                            {t('button.login')}
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={() => { navigate(-1) }}
                    >
                        {t('button.return')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
