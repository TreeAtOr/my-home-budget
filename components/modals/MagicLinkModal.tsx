import { Modal, Button, Text, Input, Row, Checkbox, Spacer } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import { IAbstractModalProps } from "../../types/IAbstractModalProps";
interface IMagicLinkModalProps extends IAbstractModalProps {}
export function MagicLinkModal({ isVisible, closeHandler }: IMagicLinkModalProps) {
    const { t } = useTranslation('common')

    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                🎉{t('MagicLinkModalHeader')}
                <Text b size={18}>
                    {t('MagicLinkModalHeaderBold')}
                </Text>🎉
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text size={18}>
                {t('MagicLinkModalContent')}
            </Text>
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                {t('buttonClose')}
            </Button>
        </Modal.Footer>
    </Modal>)
}