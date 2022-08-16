import { Button, Card, Col, Grid, Link, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import { AddRecordModal } from "./modals/AddRecordModal";
import { ErrorModal } from "./modals/ErrorModal";
import { InformationModal } from "./modals/InformationModal";
import { SelectPeriodModal } from "./modals/SelectPeriodModal";
import { recordsStore } from '../store/RecordsStore';
import useTranslation from "next-translate/useTranslation";

export default observer(function BudgetHeader({ setMode, mode }) {
    const { t } = useTranslation('common');

    const [isGreetingsVisible, setGreetingsVisible] = useLocalStorage('is-new', false);

    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [isAddFactVisible, setAddFactVisible] = useState(false);

    const [isPeriodPickerVisible, setPeriodPickerVisible] = useState(false);

    const [periodString, setPeriodString] = useState("")
    useEffect(() => setPeriodString(recordsStore.periodString), [recordsStore.periodString])

    const submitAddPlanHandler = (item ,repeats) => {
        if(!repeats) recordsStore.createRecord("plan", item)
        else recordsStore.createPeriodicRecords("plan", item, repeats)
        setAddPlanVisible(false)
    }
    const submitAddFactHandler = (item,repeats) => {
        if(!repeats) recordsStore.createRecord("fact", item)
        else recordsStore.createPeriodicRecords("fact", item, repeats)
        setAddFactVisible(false)
    }

    const submitPeriodPickerHandler = (from, to) => {
        recordsStore.setPeriod(from, to)
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
            <Text>{t('GreetingsHeader')}</Text>
            <Text>{t('GreetingsContent')}</Text>
            <Spacer y={0.3} />
            <Text>{t('GreetingsMoreInformation')}</Text>
            <Link href='https://youtu.be/jV9uXh_1Pso'>{t('WatchGuidOnYouTube')}</Link>
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
                            <Col><Text b size={24} color="gray">{t('BudgetOverviewHeader').toUpperCase()}</Text></Col>
                            <Col>
                                <Button onClick={openPeriodPickerHandler} color='grey'>
                                    {periodString}
                                </Button>
                            </Col>
                            <Button onClick={openAddPlanHandler} color='gradient' auto>{t('AddPlanSpending')}</Button>
                            <Spacer x={1} />
                            <Button onClick={openAddFactHandler} color='primary' auto>{t('AddFactSpending')}</Button>
                        </Row>}
                </Card.Body>
            </Card>
        </Grid>

        {mode == 'mdiagrams' ? <Grid xs={12}>
            <Button
                css={{ width: '100%' }}
                onClick={openPeriodPickerHandler}
                color='gradient'
                auto>
                {periodString}
            </Button>
        </Grid> : <></>}

        {mode == 'mplan' ? <Grid xs={12}>
            <Button
                css={{ width: '100%' }}
                onClick={openAddPlanHandler}
                color='gradient'
                auto>
                {t('AddPlanSpending')}
            </Button>
        </Grid> : <></>}

        {mode == 'mfact' ? <Grid xs={12}>
            <Button
                css={{ width: '100%' }}
                onClick={openAddFactHandler}
                color='gradient'
                auto>
                {t('AddFactSpending')}
            </Button>
        </Grid> : <></>}
    </>)
})