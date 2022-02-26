import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {  useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../store/actions/auth.actions';
import { RootState } from '../../store/store';

const Register = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let navigate = useNavigate();

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
                navigate(`/profile/${ userData.uid}`);
        },
    });

    return(   
        <div className='form__container-centered'>
            <form onSubmit={ formik.handleSubmit }>
                <span>{ t('labels.createAccount')}</span>
                <FormControl>
                    <FormLabel htmlFor='name'>{ t('labels.form.name') }</FormLabel>
                    <Input id='name' type='text' name="name" onChange={ formik.handleChange } value={ formik.values.name }/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email'>{ t('labels.form.email') }</FormLabel>
                    <Input id='email' type='email' name="email"  onChange={ formik.handleChange } value={ formik.values.email }/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>{ t('labels.form.password') }</FormLabel>
                    <Input id='password' type='password' name="password" onChange={formik.handleChange} value={formik.values.password} />
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
                        {t('button.createAccount')}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default Register;
