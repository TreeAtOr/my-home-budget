import { Button, Card, Col, Grid, Link, Row, Spacer, Text } from "@nextui-org/react";
import { useState } from "react";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import { AddRecordModal } from "./modals/AddRecordModal";
import { ErrorModal } from "./modals/ErrorModal";
import { InformationModal } from "./modals/InformationModal";
import { SelectPeriodModal } from "./modals/SelectPeriodModal";

export default function BudgetHeader({ addPlan, addFact, setPeriod,period, setMode, mode }) {
    const [isGreetingsVisible, setGreetingsVisible] = useLocalStorage('is-new', true);

    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [isAddFactVisible, setAddFactVisible] = useState(false);

    const [isPeriodPickerVisible, setPeriodPickerVisible] = useState(false);

    const submitAddPlanHandler = (label, amount, kind) => {
        addPlan(label, amount, kind)
        setAddPlanVisible(false)
    }
    const submitAddFactHandler = (label, amount, kind) => {
        addFact(label, amount, kind)
        setAddFactVisible(false)
    }

    const submitPeriodPickerHandler = (from, to) => {
        setPeriod([from, to])
        setPeriodPickerVisible(false)
    }

    const openAddPlanHandler = () => setAddPlanVisible(true)
    const openAddFactHandler = () => setAddFactVisible(true)

    const closeAddPlanHandler = () => setAddPlanVisible(false)
    const closeAddFactHandler = () => setAddFactVisible(false)

    const closeGreetingHandler = () => setGreetingsVisible(false)
    const openPeriodPickerHandler = () => setPeriodPickerVisible(true)
    const closePeriodPickerHandler = () => setPeriodPickerVisible(false)

    //const onEditFactRecord = (item) => setRecordToEdit(item)
    //const onEditPlanRecord = (item) => setRecordToEdit(item)

    return (<>
        <InformationModal
            isVisible={isGreetingsVisible}
            closeHandler={closeGreetingHandler}
            headline="🌟 Greetings! 🌟"
        >
            <Text>{"First time here? So... Let`s start planing."}</Text>
            <Text>{'To create a new planed spending, press a button "Add planed spending" in top-right corner.'}</Text>
            <Spacer y={0.3} />
            <Text>Want more information?</Text>
            <Link href='https://youtu.be/jV9uXh_1Pso'>Watch the guid on YouTube </Link>
        </InformationModal>
        <AddRecordModal
            isVisible={isAddPlanVisible}
            closeHandler={closeAddPlanHandler}
            submitHandler={submitAddPlanHandler} />

        <AddRecordModal
            isVisible={isAddFactVisible}
            closeHandler={closeAddFactHandler}
            submitHandler={submitAddFactHandler} />
        <SelectPeriodModal
            isVisible={isPeriodPickerVisible}
            closeHandler={closePeriodPickerHandler}
            submitHandler={submitPeriodPickerHandler}
        />
        <Grid md={12} xs={12}>
            <Card color='primary'>
                <Card.Body>
                    {mode != 'desktop' ?
                        <Row justify='space-between'>
                            <Button onClick={() => setMode('mplan')} color='gradient' auto>Plan</Button>
                            <Button onClick={() => setMode('mdiagrams')} color='gradient' auto>Total</Button>
                            <Button onClick={() => setMode('mfact')} color='gradient' auto>Fact</Button>
                        </Row>
                        :
                        <Row justify='space-between'>
                            <Spacer x={1} />
                            <Col><Text b size={24} color="gray">{"Your budget overview".toUpperCase()}</Text></Col>
                            <Col>
                                <Button onClick={openPeriodPickerHandler} color='grey'>
                                    {period[0].toDateString()}-{period[1].toDateString()}
                                </Button>
                            </Col>
                            <Button onClick={openAddPlanHandler} color='gradient' auto>Add planing spending</Button>
                            <Spacer x={1} />
                            <Button onClick={openAddFactHandler} color='primary' auto>Add fact spending</Button>
                        </Row>}
                </Card.Body>
            </Card>
        </Grid>
        {mode == 'mplan' ? <Grid xs={12}>
            <Button
                css={{ width: '100%' }}
                onClick={openAddPlanHandler}
                color='gradient'
                auto>
                Add planing spending
            </Button>
        </Grid> : <></>}

        {mode == 'mfact' ? <Grid xs={12}>
            <Button
                css={{ width: '100%' }}
                onClick={openAddFactHandler}
                color='gradient'
                auto>
                Add fact spending
            </Button>
        </Grid> : <></>}
    </>)
}