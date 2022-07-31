import { Modal, Button, Text, Input, Grid, Checkbox, Spacer } from "@nextui-org/react";
import { useState } from "react";

export function SelectPeriodModal({ isVisible, closeHandler, submitHandler }) {
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    const setPeriodHandler = () => {
        console.log(from,to);
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
                Enter your new period
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Spacer y={0.2} />
            <Input
                type={"date"}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                label="From" />
            <Spacer y={0.2} />
            <Input
                type={"date"}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                label="To" />
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat disabled={!(from && to)} color="primary" onClick={setPeriodHandler}>
                Set period
            </Button>
            <Button auto flat color="error" onClick={closeHandler}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>)
}