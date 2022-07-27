
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
export function MagicLinkModal({ isVisible, closeHandler }) {
    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                You looks 
                <Text b size={18}>
                    awesome
                </Text>
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text size={18}>
                Check the email for magic link
            </Text>
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>)
}