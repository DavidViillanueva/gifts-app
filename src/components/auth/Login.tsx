import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { startLoginWithEmailPassword } from '../../store/actions/auth.actions';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch( startLoginWithEmailPassword(values.email, values.password) );
            navigate('/profile/1234');
        },
    });

    return(
        <div className='form__container-centered'>
            <form onSubmit={ formik.handleSubmit }>
                <span>{t('labels.login')}</span>
                <FormControl>
                    <FormLabel htmlFor='email'>{ t('labels.form.email') }</FormLabel>
                    <Input id='email' type='email' name="email" onChange={ formik.handleChange } value={ formik.values.email }/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>{ t('labels.form.password') }</FormLabel>
                    <Input id='password' type='password' name="password"  onChange={formik.handleChange} value={formik.values.password}/>
                </FormControl>
                <div className='form__buttons'>
                    <Link to="/">
                        <Button
                            mt={4}
                            colorScheme='blue'
                        >
                            {t('button.return')}
                        </Button>
                    </Link>
                    <Button
                        mt={4}
                        colorScheme='blue'
                        type='submit'
                    >
                        {t('button.login')}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default Login;
