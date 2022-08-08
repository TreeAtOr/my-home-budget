import { Modal, Button, Text, Input, Grid, Checkbox, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function AddRecordModal({ state,isVisible, closeHandler, submitHandler }) {
    const [label, setLabel] = useState(state?state.label:"")
    const [amount, setAmount] = useState(state?state.amount:0)
    const [date, setDate] = useState(state?state.date:new Date())
    const [kind, setKind] = useState(state?state.kind:"")

    useEffect(() => {
        if(!state) return
        setLabel(state.label)
        setAmount(state.amount)
        setDate(state.date)
        setKind(state.kind)
    },[state])

    const addRecordHandler = () => {
        submitHandler(label, amount, kind)
        setLabel("")
        setAmount()
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
                What spending you are looking for?
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Spacer y={0.2} />
            <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                clearable
                labelPlaceholder="Label" />
            <Spacer y={0.2} />
            <Input value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                labelPlaceholder="Amount" />
            <Spacer y={0.2} />
            <Input
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                clearable
                labelPlaceholder="Kind" />
            <Spacer y={0.1} />
            <Input
                type={"date"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                label="Date(optional)" />
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat disabled={!(label && amount)} color="primary" onClick={addRecordHandler}>
                Add Record
            </Button>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>)
}