import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLoginWithEmailPassword } from '../../store/actions/auth.actions';
import { RootState } from '../../store/store';
import { TextField, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import { CircularProgress } from '@material-ui/core';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let navigate = useNavigate();

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
                    <TextField
                        id="email"
                        name="email"
                        label={t('labels.form.email')}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </FormControl>
                <FormControl className="form__control">
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label={t('labels.form.password')}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        color='primary'
                    />
                </FormControl>
                <div className='form__buttons'>
                    {userData.loading 
                    ?
                        <CircularProgress color="primary" size={30}/>
                    :
                        <Button
                            variant="contained"
                            onClick={ () => formik.handleSubmit() }
                            color='primary'
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
