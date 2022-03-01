import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { errors } from '../../configs/errors.types';
import { startLoadingItems } from '../../store/actions/items.actions';
import { RootState } from '../../store/store';
import { isObjEmpty } from '../../utils/isObjEmpty';

const Profile = () => {
  const dispatch = useDispatch();
  const { profileId } = useParams();

  let itemsData = useSelector((state: RootState) => {
    return state.items
  })

  useEffect(() => {
    if(profileId)
      dispatch( startLoadingItems( profileId ) );
  }, [profileId, dispatch])
  

  let isThisUser: boolean = false;
  let auth  = useSelector((state: RootState) => {
    return state.auth
  })

  

  if( profileId === auth.uid )
    isThisUser = true;

  if( itemsData.loading )
    return (
      <h1>Loading</h1>
    )

  return (
    <div>
      {( isThisUser ) &&
        <div>
          <p>Es el perfil del usuario logueado!</p>
        </div>
      }

      {(itemsData.error === errors.E100)?
        <p>No existe el usuario</p>
        :
        isObjEmpty(itemsData.items)?
         <p>El usuario no tiene data</p>
         :
         <p>El usuario tiene data</p>

      }

    </div>
  )
}

export default Profile