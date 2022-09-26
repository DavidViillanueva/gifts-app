import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { colors } from '../../../configs/colors';
import { types } from '../../../configs/types';
import { startSettingColorThemePublicUser } from '../../../store/actions/auth.actions';
import ColorContext from '../../../store/context/colorContext';

const EditProfileForm = ({userid}:any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const {dispatchColor} = useContext(ColorContext);
    const [color, setColor] = useState('');
    // const formik = useFormik({
    //     initialValues: {
    //         itemName: '',
    //         itemPrice: 0,
    //     },
    //     onSubmit: values => {
    //       console.log(values);
    //     },
    // });

    const handleColorChange = (e:any) => {
        if(e.target.value) {
            setColor(e.target.value);
            dispatchColor({ type: types.uiSetProfileColor, payload: colors[e.target.value]});
            dispatch(startSettingColorThemePublicUser(userid, colors[e.target.value]));
        }
    }
    return (
        <form className='form__column'>
            <FormControl>
                <InputLabel id="colorSelect-label">{t('labels.form.color')}</InputLabel>
                <Select
                    labelId="colorSelect-label"
                    id="colorSelect"
                    value={color}
                    label={t('labels.form.color')}
                    onChange={handleColorChange}
                >
                    <MenuItem value={'blue'}>{t('labels.form.colorBlue')}</MenuItem>
                    <MenuItem value={'red'}>{t('labels.form.colorRed')}</MenuItem>
                    <MenuItem value={'pink'}>{t('labels.form.colorPink')}</MenuItem>
                    <MenuItem value={'cyan'}>{t('labels.form.colorCyan')}</MenuItem>
                </Select>
            </FormControl>
        </form>
    )
}

export default EditProfileForm