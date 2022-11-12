import { useTranslation } from 'react-i18next';
import {  useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../store/actions/auth.actions';
import { RootState } from '../../store/store';
import { TextField, FormControl, Button, CircularProgress } from '@mui/material';

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
            <form onSubmit={ formik.handleSubmit } className='form__column'>
                <span>{ t('labels.createAccount')}</span>
                <FormControl className="form__control">
                    <TextField
                        id="name"
                        name="name"
                        label={t('labels.form.name')}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </FormControl>
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
                        label={t('labels.form.password')}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        helperText="Minimo 6 caracteres"
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
