import { IconButton } from '@mui/material';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

const EditProfile = ({ userId }:any) => {
  return (
    <IconButton aria-label="edit"  size="small" onClick={() => console.log(userId)}>
        <EditIcon  fontSize="inherit"/>
    </IconButton>
  )
}

export default EditProfile;
