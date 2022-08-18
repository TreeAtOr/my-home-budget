import { Modal, Button, Text, Input, Row, Checkbox, Spacer } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import { IAbstractModalProps } from "../../types/IAbstractModalProps";
interface IInformationModalProps extends IAbstractModalProps {
    headline: string;
    children: Array<JSX.Element>;
}
export function InformationModal({ isVisible, closeHandler, headline, children }: IInformationModalProps) {
    const { t } = useTranslation('common')

    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                {headline}
            </Text>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                {t('buttonClose')}
            </Button>
        </Modal.Footer>
    </Modal>)
}