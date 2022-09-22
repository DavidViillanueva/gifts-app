import { IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useState } from 'react';


const EditProfile = ({ userId }: any) => {
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
                <h1>editar perfil</h1>
            </Modal>
        </>
    )
}

export default EditProfile;
