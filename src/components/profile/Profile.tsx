import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { errors } from '../../configs/errors.types';
import { startLoadingPublicUser } from '../../store/actions/auth.actions';
import { startLoadingItems } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';
import { isObjEmpty } from '../../utils/isObjEmpty';
import ItemsCollection from '../layout/ItemsCollection';
import AddItemForm from '../shared/AddItemForm';
import AddItem from '../shared/AddItem';
import HeaderProfile from './headerProfile/HeaderProfile';
import ColorContext from '../../store/context/colorContext';
import { types } from '../../configs/types';
import { doc, getDoc } from 'firebase/firestore';
import { databaseRef } from '../../configs/firebaseConfig';
import { useTranslation } from 'react-i18next';


const Profile = () => {
    const dispatch = useDispatch();
    const { dispatchColor } = useContext(ColorContext)
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { profileId } = useParams();
    const [isThisUser, setIsThisUser] = useState(false);

    let state = useSelector((state: RootState) => {
        return state
    })
    
   
    useEffect(() => { 
        if (profileId) {
            dispatch(startLoadingItems(profileId));
            dispatch(startLoadingPublicUser(profileId))
            const docRef = doc(databaseRef, `${profileId}/user-data`);
            getDoc(docRef).then(docSnap => {
                    if(docSnap.exists()){
                        dispatchColor({type: types.uiSetProfileColor, payload: docSnap.data().color})
                    }
            });
        }
        // eslint-disable-next-line
    }, [profileId])
    
    useEffect(() => {
        console.log(profileId, state)
        if (profileId === state.auth.uid) {
            setIsThisUser(true);
        } else {
            setIsThisUser(false);
        }
    // eslint-disable-next-line  
    }, [state])
    


    if (state.items.loading)
        return (
            <div className='loading__container'>
                <CircularProgress color="primary" size={30} />
            </div>
        )

    if ((state.items.error === errors.E100))
        navigate('/');

    return (
        <div className='profile__container'>
            <div className='profile__panel'>
                {(isThisUser) &&
                    <div>
                        <AddItem
                            children={<AddItemForm />}
                        />
                    </div>
                }

                <HeaderProfile user={state.auth.publicUser} userId={state.auth.uid} editProfile={isThisUser}/>
                {(isObjEmpty(state.items.items)) &&
                    <h1>{t('labels.noItemsData')}</h1>
                }
                {(!isObjEmpty(state.items.items)) &&
                    <ItemsCollection
                        editPermission={isThisUser}
                        items={state.items.items}
                    />
                }
            </div>
        </div>
    )
}

export default Profile