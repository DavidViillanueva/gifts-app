import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Login = () => {
    const { t } = useTranslation();
    return(
        <div className='form__container-centered'>
            <form>
                <span>Login</span>
                <FormControl>
                    <FormLabel htmlFor='email'>{ t('labels.form.email') }</FormLabel>
                    <Input id='email' type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>{ t('labels.form.password') }</FormLabel>
                    <Input id='password' type='password' />
                </FormControl>
                <div className='form__buttons'>
                    <Link to="/">
                        <Button
                            mt={4}
                            colorScheme='teal'
                        >
                            Volver
                        </Button>
                    </Link>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default Login;
