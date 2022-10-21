import { Box, IconButton, Modal, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import AddItemForm from './AddItemForm';
import CloseIcon from '@mui/icons-material/Close';


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
                <Box className="item__addItemModals">
                    <span>
                        <Tooltip title={"cerrar"}>
                            <IconButton aria-label="edit" size="small" onClick={() => setOpen(false)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <AddItemForm item={item} />
                </Box>
        </Modal>
    </div>
  )
}

export default EditItem