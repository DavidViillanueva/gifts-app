import { Modal } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react'
import BasicSpeedDial from './BasicSpeedDial';
import CloseIcon from '@mui/icons-material/Close';


const AddItem = ({ children } : { children: JSX.Element }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <>
        <BasicSpeedDial 
            icon={<Add />}
            onClick={handleOpen}
        />
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
                { children }
            </Box>
        </Modal>
    </>
    )
}

export default AddItem