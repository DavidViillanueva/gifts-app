import { IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import { Box, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';




const EditProfile = ({ userId, user }: any) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const handleClose = () => setOpen(false);
    return (
        <>
            <Tooltip title={t('labels.editProfile') || ''}>
                <IconButton aria-label="edit" size="large" onClick={() => setOpen(true)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="item__addItemModals">
                    <EditProfileForm userid={userId} user={user} />
                </Box>
            </Modal>
        </>
    )
}

export default EditProfile;
