import { IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import { Box } from '@material-ui/core';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



const EditProfile = ({ userId, user }: any) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <>
            <IconButton aria-label="edit" size="small" onClick={() => setOpen(true)}>
                <EditIcon fontSize="inherit" />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditProfileForm userid={userId} user={user} />
                </Box>
            </Modal>
        </>
    )
}

export default EditProfile;
