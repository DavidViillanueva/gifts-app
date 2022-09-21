import { Modal } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react'
import BasicSpeedDial from './BasicSpeedDial';
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
            <Box sx={style}>
                { children }
            </Box>
        </Modal>
    </>
    )
}

export default AddItem