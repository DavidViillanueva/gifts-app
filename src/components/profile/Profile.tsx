import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { errors } from '../../configs/errors.types';
import { setPublicUser, startLoadingPublicUser } from '../../store/actions/auth.actions';
import { startLoadingItems } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';
import { isObjEmpty } from '../../utils/isObjEmpty';
import ItemsCollection from '../layout/ItemsCollection';
import AddItemForm from '../shared/AddItemForm';
import ChakraModal from '../shared/ChakraModal';


const Profile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profileId } = useParams();
  const [publicUser, setpublicUser] = useState<boolean>(false);

  let itemsData = useSelector((state: RootState) => {
    return state.items
  })

  useEffect(() => {
    if(profileId) {
      dispatch( startLoadingItems( profileId ) );
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
  }, [auth])
  
  

  if( profileId === auth.uid ) {
    isThisUser = true;
    setPublicUser(false);
  } else {
    setPublicUser(true);
  }

  if( itemsData.loading )
    return (
      <div className='loading__container'><Spinner color='blue.500' /></div>
    )

  return (
    <div className='profile__container'>
      <div className='profile__panel'>
        {( isThisUser ) ? 
          <div>
            <Alert status='success'>
              <AlertIcon />
              {t('labels.yourProfile')}
            </Alert>
            <ChakraModal 
              children={ <AddItemForm /> }
            />
          </div>
          :
          <div>
            <Alert status='success'>
              <AlertIcon />
              {t('labels.publicProfile')}{auth.publicUser.name}
            </Alert>
          </div>
        }

        {(itemsData.error === errors.E100) &&
          <Alert status='error'>
            <AlertIcon />
            No existe el usuario
          </Alert>
        } 
        {(isObjEmpty(itemsData.items)) &&
          <Alert status='warning'>
            <AlertIcon />
            Parece que no hay datos
          </Alert>
        }
        {(!isObjEmpty(itemsData.items)) &&
          <ItemsCollection
            editPermission = { isThisUser }
            items={ itemsData.items}
          />
        }
      </div>
    </div>
  )
}

export default Profile