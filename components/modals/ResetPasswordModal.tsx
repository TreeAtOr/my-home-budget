import { Modal, Button, Text, Input, Row, Checkbox, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { store } from "../../store/Store";
import { IAbstractModalProps } from "../../types/IAbstractModalProps";
interface IResetPasswordModalProps extends IAbstractModalProps { }
export default observer(function ResetPasswordModal({ isVisible, closeHandler }: IResetPasswordModalProps) {
    const { t } = useTranslation('common')
    const [email, setEmail] = useState<string>()

    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                {t('ResetPassword')}
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text size={18}>
                {t('ResetPasswordContent')}
            </Text>
            <Spacer y={1} />
            <Input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                labelPlaceholder={t('placeholderEmail')} />
        </Modal.Body>
        <Modal.Footer>
            <Button auto color="error" onClick={() => {
                store.handleResetPassword(email)
                closeHandler()
            }}>
                {t('buttonResetPassword')}
            </Button>
            <Button auto flat color="error" onClick={closeHandler}>
                {t('buttonClose')}
            </Button>
        </Modal.Footer>
    </Modal>)
})