import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { t } = useTranslation();
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
