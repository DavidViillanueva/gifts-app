import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next'

const AddItemForm = () => {

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
        itemName: '',
        itemPrice: '',
        itemDescription: ''
    },
    onSubmit: values => {
      alert( values )
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
              // isLoading
          >
              {t('button.itemSave')}
          </Button>
      </div>
    </form>
  )
}

export default AddItemForm