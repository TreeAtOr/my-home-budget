import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";

export function ErrorModal({ isVisible, closeHandler, message }) {
    const { t } = useTranslation('common')

    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                <Text b size={18}>
                {t('ErrorModalHeaderBold')}
                </Text>
                {t('ErrorModalHeader')}🪲
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text size={18}>
                {message}
            </Text>
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                {t('buttonClose')}
            </Button>
        </Modal.Footer>
    </Modal>)
}