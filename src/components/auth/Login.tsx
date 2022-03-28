import React from 'react';
import { Button, FormControl, FormLabel, Input, Tooltip } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { starLoginWithGoogle, startLoginWithEmailPassword } from '../../store/actions/auth.actions';
import { FcGoogle } from "react-icons/fc";
import { RootState } from '../../store/store';

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
            dispatch( startLoginWithEmailPassword(values.email, values.password) );
            if( userData.uid )
                navigate(`/profile/${ userData.uid }`);
        },
    });

    const handleGoogleLogin = () => {
        dispatch( starLoginWithGoogle() )
    }

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
                        isLoading={ userData.loading }
                    >
                        {t('button.login')}
                    </Button>
                </div>

                <div className='form__socialButtons'>
                    <Tooltip label={t('labels.loginWithGoogle')}>
                        <div 
                            className="google-btn"
                            onClick= { handleGoogleLogin }
                        >
                                <div className="google-icon-wrapper">
                                    <FcGoogle /> 
                                </div>
                        </div>
                    </Tooltip>
                </div>


            </form>
        </div>
    );
};

export default Login;