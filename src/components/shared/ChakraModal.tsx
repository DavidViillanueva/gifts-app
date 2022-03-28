import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Add } from '@mui/icons-material';
import React from 'react'
import BasicSpeedDial from './BasicSpeedDial';

const ChakraModal = ({ children } : { children: JSX.Element }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <>
        <BasicSpeedDial 
            icon={<Add />}
            onClick={ onOpen }
        />
        <Modal
            isOpen={ isOpen }
            onClose={ onClose }
        >

        <ModalOverlay />
        <ModalContent>
            <ModalBody>
                { children }
            </ModalBody>
            <ModalCloseButton />
        </ModalContent>
        </Modal>
    </>
    )
}

export default ChakraModal