import { Modal, Button, Text, Input, Grid, Checkbox, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { recordsStore } from "../../store/RecordsStore";
import { IAbstractModalProps } from "../../types/IAbstractModalProps";
interface ISelectPeriodModalProps extends IAbstractModalProps {
    submitHandler: (from: Date, to: Date) => void;
}
export const SelectPeriodModal = observer(
    function SelectPeriodModal({ isVisible, closeHandler, submitHandler }: ISelectPeriodModalProps) {
        const { t } = useTranslation('common')
        const [from, setFrom] = useState("")
        const [to, setTo] = useState("")

        useEffect(() => {
            setFrom(recordsStore.period[0].toLocaleDateString())
            setTo(recordsStore.period[1].toLocaleDateString())
        }, [recordsStore.period])

        const setPeriodHandler = () => {
            console.log(from, to);
            submitHandler(new Date(from), new Date(to))
        }
        return (<Modal
            closeButton
            aria-labelledby="modal-title"
            open={isVisible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {t('EnterPeriod')}
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Spacer y={0.2} />
                <Input
                    type={"date"}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    label={t('formFrom')} />
                <Spacer y={0.2} />
                <Input
                    type={"date"}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    label={t('formTo')} />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat disabled={!(from && to)} color="primary" onClick={setPeriodHandler}>
                    {t('buttonSetPeriod')}
                </Button>
                <Button auto flat color="error" onClick={closeHandler}>
                    {t('buttonClose')}
                </Button>
            </Modal.Footer>
        </Modal>)
    })