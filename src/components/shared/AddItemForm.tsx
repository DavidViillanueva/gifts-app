import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
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
        itemDescription: ''
    },
    onSubmit: values => {
      dispatch( startAddingItem( values, auth.uid ) )
    },
});

  return (
    <form onSubmit={ formik.handleSubmit   }>
      <FormControl>
          <FormLabel htmlFor='itemName'>{ t('labels.form.itemName') }</FormLabel>
          <Input id='itemName' type='text' name="itemName" onChange={ formik.handleChange } value={ formik.values.itemName }/>
      </FormControl>
      <FormControl>
          <FormLabel htmlFor='itemPrice'>{ t('labels.form.itemPrice') }</FormLabel>
          <Input id='itemPrice' type='number' name="itemPrice"  onChange={formik.handleChange} value={formik.values.itemPrice}/>
      </FormControl>
      <FormControl>
          <FormLabel htmlFor='itemDescription'>{ t('labels.form.itemDescription') }</FormLabel>
          <Input id='itemDescription' type='text' name="itemDescription"  onChange={formik.handleChange} value={formik.values.itemDescription}/>
      </FormControl>
      <div className='form__buttons'>
          <Button
              mt={4}
              colorScheme='blue'
              type='submit'
              isLoading= { itemsData.loadingItem }
          >
              {t('button.itemSave')}
          </Button>
      </div>
    </form>
  )
}

export default AddItemForm