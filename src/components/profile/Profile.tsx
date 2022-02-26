import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/store';

const Profile = () => {

  const { profileId } = useParams();
  let isThisUser: boolean = false;
  // deberiamos ver si el usuario existe o no, si existe ver si coincide con el id del logueado
  let userData = useSelector((state: RootState) => {
    return state.auth
  })

  if( profileId === userData.uid )
    isThisUser = true;


  return (
    <div>
      {( isThisUser ) &&
        <div>
          <p>Es el perfile del usuario logueado!</p>
        </div>
      }
      <div><p>{profileId}</p></div>
    </div>
  )
}

export default Profile