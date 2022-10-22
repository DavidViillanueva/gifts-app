import { CircularProgress } from '@material-ui/core';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { startAddingItem, startEditingItem } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';
import { IItem } from '../../models/item.model';
import upload from '../../assets/upload.png';

const AddItemForm = ({ item }: { item?: IItem }) => {

    const dispatch = useDispatch();
    const [picture, setPicture] = useState<any>(item?.picture || upload)

    const { t } = useTranslation();

    let auth = useSelector((state: RootState) => {
        return state.auth
    })

    let itemsData = useSelector((state: RootState) => {
        return state.items
    })

    const formik = useFormik({
        initialValues: {
            itemName: item?.itemName || '',
            itemPrice: item?.itemPrice || 0,
            itemDescription: item?.itemDescription || '',
            picture: '' || item?.picture,
            itemMark: false
        },
        onSubmit: values => {
            if(item) 
                // Editing
                dispatch(startEditingItem(values,item,auth.uid));
            else
                // Creating
                dispatch(startAddingItem(values, auth.uid))
        },
    });

    const validName = formik.values.itemName;


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
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            </FormControl>
            <div className='loading__container'>
                <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload" >
                        <img id="profile-img" src={picture} alt="profile"/>
                    </div>
                    <input id="photo-upload" type="file" onChange={(e) => {
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                            if (fileReader.readyState === 2) {
                                setPicture(fileReader.result);
                                formik.setFieldValue('picture', fileReader.result);
                            }
                        };
                        if (e.target?.files) {
                            fileReader.readAsDataURL(e?.target?.files[0])
                        }
                    }} />
                </label>
            </div>
            <FormControl className='form__control'>
                <TextField
                    id="itemDescription"
                    name="itemDescription"
                    label={t('labels.form.itemDescription')}
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.itemDescription}
                />
            </FormControl>
            <div className='form__buttons'>
                {itemsData.loadingItem
                    ?
                    <CircularProgress color="primary" size={30} />
                    :
                    <Button
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                        color="primary"
                        disabled={ !validName }
                    >
                        {t('button.itemSave')}
                    </Button>
                }
            </div>
        </form>
    )
}

export default AddItemForm