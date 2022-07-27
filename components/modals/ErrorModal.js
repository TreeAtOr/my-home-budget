import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export function ErrorModal({ isVisible, closeHandler, message }) {
    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
            <Text b size={18}>
                Ops! 
                </Text>
                    Something bad happened!
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text size={18}>
                {message}
            </Text>
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>)
}