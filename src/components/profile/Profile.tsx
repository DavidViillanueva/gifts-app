import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { errors } from '../../configs/errors.types';
import { startLoadingPublicUser } from '../../store/actions/auth.actions';
import { startLoadingItems } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';
import { isObjEmpty } from '../../utils/isObjEmpty';
import ItemsCollection from '../layout/ItemsCollection';
import AddItemForm from '../shared/AddItemForm';
import AddItem from '../shared/AddItem';
import HeaderProfile from './headerProfile/HeaderProfile';


const Profile = () => {
    const dispatch = useDispatch();
    const { profileId } = useParams();
    const [isThisUser, setIsThisUser] = useState(false);

    let state = useSelector((state: RootState) => {
        return state
    })

    useEffect(() => {
        if (profileId) {
            dispatch(startLoadingItems(profileId));
            if (profileId === state.auth.uid) {
                setIsThisUser(true);
            } else {
                dispatch(startLoadingPublicUser(profileId))
            }
        }
    }, [])


    if (state.items.loading)
        return (
            <div className='loading__container'>
                <CircularProgress color="primary" size={30} />
            </div>
        )

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

                {(state.items.error === errors.E100) &&
                    <h1>No existe el usuario</h1>
                }
                {(isObjEmpty(state.items.items)) &&
                    <h1>Parece que no hay datos</h1>
                }
                <HeaderProfile user={state.auth.publicUser} userId={state.auth.uid} editProfile={isThisUser}/>
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