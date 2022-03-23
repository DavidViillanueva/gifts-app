import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ChakraModal = ({ children, buttonText = "" } : { children: JSX.Element, buttonText: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <>
        <Button 
            onClick={onOpen}
            colorScheme="blue"
        >
            { buttonText }
        </Button>

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