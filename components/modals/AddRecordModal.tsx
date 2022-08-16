import { Modal, Button, Text, Input, Grid, Checkbox, Spacer, StyledButtonGroup, Row, StyledInputBlockLabel, Col } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
const DEFAULT_REPEATS = {
    from: "",
    to: "",
    pattern: {
        days: 0,
        months: 1,
        years: 0
    }

}
interface AddRecordModalProps {
    state: any,
    isVisible: boolean,
    closeHandler: () => void,
    submitHandler: (item: any, repeats?: any) => void,
}
export function AddRecordModal({ state, isVisible, closeHandler, submitHandler }: AddRecordModalProps) {
    const { t } = useTranslation('common')

    const [label, setLabel] = useState(state ? state.label : "")
    const [amount, setAmount] = useState(state ? state.amount : undefined)
    const [date, setDate] = useState(state ? state.date : new Date())
    const [kind, setKind] = useState(state ? state.kind : "")

    const [isOneTime, setIsOneTime] = useState(true)
    const [repeats, setRepeats] = useState(DEFAULT_REPEATS)

    const [isSpending, setIsSpending] = useState(true)

    useEffect(() => {
        if (!state) return
        setLabel(state.label)
        setAmount(state.amount)
        setDate(state.date)
        setKind(state.kind)
    }, [state])

    const addRecordHandler = () => {
        submitHandler(
            { ...state, label, amount: isSpending ? -amount : amount, date, kind: kind ? kind : label },
            isOneTime ? undefined : {
                ...repeats,
                from: new Date(repeats.from),
                to: new Date(repeats.to)
            })
        setLabel("")
        setAmount(undefined)
        setDate(new Date())
        setKind("")
    }
    return (<Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                {t('AddRecordModalHeader')}
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Spacer y={0.2} />
            <Row justify="center">
                <StyledButtonGroup>
                    <Button bordered={!isSpending} size='sm' onPress={() => setIsSpending(true)}>
                        {t('buttonSpending')}
                    </Button>
                    <Button bordered={isSpending} size='sm' onPress={() => setIsSpending(false)}>
                        {t('buttonIncome')}
                    </Button>
                </StyledButtonGroup>
            </Row>
            <Spacer y={0.2} />
            <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                clearable
                labelPlaceholder={t('formLabel')} />
            <Spacer y={0.2} />
            <Input value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                labelPlaceholder={t('formAmount')} />
            <Spacer y={0.2} />
            <Input
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                clearable
                labelPlaceholder={t('formKind')} />
            <Spacer y={0.1} />
            <Row justify="center">
                <StyledButtonGroup>
                    <Button flat={!isOneTime} size='sm' onPress={() => setIsOneTime(true)}>
                        {t('buttonOnetime')}
                    </Button>
                    <Button flat={isOneTime} size='sm' onPress={() => setIsOneTime(false)}>
                        {t('buttonRepeatable')}
                    </Button>
                </StyledButtonGroup>
            </Row>
            {isOneTime ? <>
                <Input
                    type={"date"}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    label={t('formDate')} />
            </> : <>
                <Input
                    type={"date"}
                    value={repeats.from}
                    onChange={(e) => setRepeats({ ...repeats, from: e.target.value })}
                    label={t('formFrom')} />
                <Input
                    type={"date"}
                    value={repeats.to}
                    onChange={(e) => setRepeats({ ...repeats, to: e.target.value })}
                    label={t('formTo')} />
                <StyledInputBlockLabel>
                    {t('formEvery')}
                </StyledInputBlockLabel>
                <Row gap={0.1}>
                    <Col>
                        <Input
                            type="number"
                            width="90px"
                            maxLength={4}
                            value={repeats.pattern.days}
                            onChange={(e) => setRepeats({
                                ...repeats, pattern: { ...repeats.pattern, days: Number(e.target.value) }
                            })}
                            label={t('formDays')} />
                    </Col>
                    <Col>
                        <Input
                            type="number"
                            width="90px"
                            value={repeats.pattern.months}
                            onChange={(e) => setRepeats({
                                ...repeats, pattern: { ...repeats.pattern, months: Number(e.target.value) }
                            })}
                            label={t('formMonths')} />
                    </Col>
                    <Col>
                        <Input
                            type="number"
                            width="90px"
                            value={repeats.pattern.years}
                            onChange={(e) => setRepeats({
                                ...repeats, pattern: { ...repeats.pattern, years: Number(e.target.value) }
                            })}
                            label={t('formYears')} />
                    </Col>
                </Row>

            </>}

        </Modal.Body>
        <Modal.Footer>
            <Button auto flat disabled={!(label && amount)} color="primary" onClick={addRecordHandler}>
                {t('buttonAddRecord')}
            </Button>
            <Button auto flat color="error" onClick={closeHandler}>
                {t('buttonClose')}
            </Button>
        </Modal.Footer>
    </Modal>)
}