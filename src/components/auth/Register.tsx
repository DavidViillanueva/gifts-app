import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Register = () => {

    const { t } = useTranslation();
    return(   
        <div className='form__container-centered'>
            <form>
                <span>Register</span>
                <FormControl>
                    <FormLabel htmlFor='name'>{ t('labels.form.name') }</FormLabel>
                    <Input id='name' type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email'>{ t('labels.form.email') }</FormLabel>
                    <Input id='email' type='email' />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='password'>{ t('labels.form.password') }</FormLabel>
                    <Input id='password' type='password' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='passwordConfirm'>{ t('labels.form.passwordConfirm') }</FormLabel>
                    <Input id='passwordConfirm' type='password' />
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

export default Register;
