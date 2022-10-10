import { CircularProgress } from '@material-ui/core';
import { TextField, FormControl } from '@mui/material';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { startAddingItem } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';

const AddItemForm = () => {

  const dispatch = useDispatch();

  const { t } = useTranslation();

  let auth  = useSelector((state: RootState) => {
    return state.auth
  })

  let itemsData = useSelector((state: RootState) => {
    return state.items
  })

  const formik = useFormik({
    initialValues: {
        itemName: '',
        itemPrice: 0,
        itemDescription: '',
        picture: '',
        itemMark: false
    },
    onSubmit: values => {
      dispatch( startAddingItem( values, auth.uid ) )
    },
});

  const changeInputFileName = (e:any) => {
    document.getElementById('fileInputWrapper')?.setAttribute('data-text',e);
  }

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
      <FormControl className='form__control'>
        <div id='fileInputWrapper'className='fileInputWrapper' data-text={ t('labels.form.selectFile') } upload-text={ t('labels.form.examine') }>
          <input type="file" id="picture" name="picture" 
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  formik.setFieldValue('picture', fileReader.result);
                }
              };
              if( e.target?.files ){
                changeInputFileName(e.target?.files[0].name);
                fileReader.readAsDataURL(e?.target?.files[0])
              }
            }}
          />
        </div>
      </FormControl>
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
          <CircularProgress color="primary" size={30}/>
        :
          <Button
              variant="contained"
              onClick={ () => formik.handleSubmit() }
              color="primary"
          >
              {t('button.itemSave')}
          </Button>
        }
      </div>
    </form>
  )
}

export default AddItemForm