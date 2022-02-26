
import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const { profileId } = useParams();

  return (
    <div><p>{profileId}</p></div>
  )
}

export default Profile