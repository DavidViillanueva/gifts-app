import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { errors } from '../../configs/errors.types';
import { setPublicUser, startLoadingPublicUser } from '../../store/actions/auth.actions';
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

  let itemsData = useSelector((state: RootState) => {
    return state.items
  })

  useEffect(() => {
    if (profileId) {
      dispatch(startLoadingItems(profileId));
    }
  }, [profileId, dispatch])


  let isThisUser: boolean = false;
  let auth  = useSelector((state: RootState) => {
    return state.auth
  })

  useEffect(() => {
    if( profileId === auth.uid ) {
      isThisUser = true;
      setPublicUser(false);
    } else {
      dispatch(startLoadingPublicUser(profileId))
    }
    
  },[auth, profileId])

  useEffect(() => {
    if( auth.publicUser)
      setPublicUser(true);
  },[auth])
  

  if( profileId === auth.uid ) {
    isThisUser = true;
    setPublicUser(false);
  } else {
    setPublicUser(true);
  }

  if( itemsData.loading )
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

        {(itemsData.error === errors.E100) &&
          <h1>No existe el usuario</h1>
        }
        {(isObjEmpty(itemsData.items)) &&
          <h1>Parece que no hay datos</h1>
        }
        <HeaderProfile user={auth.publicUser} />
        {(!isObjEmpty(itemsData.items)) &&
          <ItemsCollection
            editPermission={isThisUser}
            items={itemsData.items}
          />
        }
      </div>
    </div>
  )
}

export default Profile