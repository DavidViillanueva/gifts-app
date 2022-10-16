import { Box, IconButton, Modal, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import AddItemForm from './AddItemForm';

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

const EditItem = ({ item }:any) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
  return (
    <div>
        <Tooltip title={'Editar Item'}>
            <IconButton aria-label="edit" size="large" onClick={() => setOpen(true)}>
                <EditIcon fontSize="small" />
            </IconButton>
        </Tooltip>

        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddItemForm item={item} />
                </Box>
        </Modal>
    </div>
  )
}

export default EditItem