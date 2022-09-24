import { FormControl, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';

const EditProfileForm = () => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            itemName: '',
            itemPrice: 0,
        },
        onSubmit: values => {
          console.log(values);
        },
    });
    return (
        <form className='form__column'>
            <FormControl className='form__control'>
                <TextField
                    id="itemName"
                    name="itemName"
                    label={t('labels.form.itemName')}
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.itemName}
                />
            </FormControl>
            <FormControl className='form__control'>
                <TextField
                    id="itemPrice"
                    name="itemPrice"
                    label={t('labels.form.itemPrice')}
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.itemPrice}
                />
            </FormControl>
        </form>
    )
}

export default EditProfileForm