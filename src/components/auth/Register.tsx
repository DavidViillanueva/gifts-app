import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../store/actions/auth.actions';
import { RootState } from '../../store/store';
import { FormControl, Button, CircularProgress, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    let userData = useSelector((state: RootState) => {
        return state.auth
    })

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        onSubmit: values => {
            dispatch( startRegisterWithEmailPasswordName(values.email,values.password,values.name) )
            if( userData.uid )
                navigate(`/profile/${userData.uid}`);
        },
    });

    return(   
        <div className='form__container-centered'>
            <form onSubmit={ formik.handleSubmit } className='form__column'>
                <span>{ t('labels.createAccount')}</span>
                <FormControl className="form__control">
                    <InputLabel htmlFor="standard-adornment-password">{t('labels.form.name')}</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        color='primary'
                    />
                </FormControl>
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
                        <CircularProgress color="primary" size={30} />
                        :
                        <Button
                            color='primary'
                            type='submit'
                            variant="contained"
                        >
                            {t('button.createAccount')}
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={ () => { navigate(-1) }}
                    >
                        {t('button.return')}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default Register;
