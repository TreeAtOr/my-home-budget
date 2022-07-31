import { Text, Table, Container, Grid, Row, Col, Spacer, Button, Card, Link } from '@nextui-org/react';
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../utils/supabaseClient'
import BarDiagram from './diagrams/BarDiagram';
import DonutDiagram from './diagrams/DonutDiagram';
import { AddRecordModal } from './modals/AddRecordModal';
import { ErrorModal } from './modals/ErrorModal';
import { InformationModal } from './modals/InformationModal';
import { SpendingTable } from './tables/SpendingTable';
import { TotalTable } from './tables/TotalTable';
import useAdaptivity from '../utils/hooks/useAdaptivity';
import Footer from '../components/ui/Footer'
import { SelectPeriodModal } from './modals/SelectPeriodModal';

const colors = ['#17143c', '#12435e', '#0e7280', '#09a1a2', '#05d0c4', '#00ffe6', '#30ffb8', '#60ff8a', '#90ff5c', '#bfff2e', '#f2e1ef', '#f5cade', '#f8b3ce', '#fc9dbe', '#ff86ae', '#e96b96', '#d4507f', '#be3668', '#a91b51', '#93003a']
function getColorByName(name) {
    let hash = 0;
    for (let i = 0, len = name.length; i < len; i++) {
        let chr = name.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return colors[Math.abs(hash) % colors.length]
}

export default function Budget({ session, logout }) {
    const [dataLoading, setDataLoading] = useState(true)
    const [planedLoading, setPlanedLoading] = useState(true)
    const [factsLoading, setFactsLoading] = useState(true)

    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setMessage] = useState('');

    const [isGreetingsVisible, setGreetingsVisible] = useState(true);

    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [isAddFactVisible, setAddFactVisible] = useState(false);

    const [isPeriodPickerVisible, setPeriodPickerVisible] = useState(false);


    const [data, setData] = useState()
    const [factDiagram, setFactDiagram] = useState()
    const [planDiagram, setPlanDiagram] = useState()
    const [composedDiagram, setComposedDiagram] = useState()

    const [planTable, setPlanTable] = useState([])
    const [factTable, setFactTable] = useState([])

    const [period, setPeriod] = useState([new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date(Date.now())])

    const [mode, setMode] = useState('desktop') //'mfact' 'mplan', 'mdiagrams'

    const size = useAdaptivity()
    useEffect(() => {
        if (size == 'xs' && mode == 'desktop') setMode('mdiagrams')
        else if (size != 'xs' && mode != 'desktop') setMode('desktop')
    }, [size])

    const errorCloseHandler = () => setErrorVisible(false)



    useEffect(() => {
        getData()
        getPlaned()
        getFacts()
    }, [session, period])

    useEffect(() => {
        if (data === undefined) return
        if (data === []) setGreetingsVisible(true)
        const _fact = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        }
        const _plan = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        }

        for (let i of data) {
            _fact.labels.push(i.total_kind)
            _fact.datasets[0].data.push(i.total_fact)
            _fact.datasets[0].backgroundColor.push(getColorByName(i.total_kind))
            _fact.datasets[0].hoverBackgroundColor.push(getColorByName(i.total_kind))

            _plan.labels.push(i.total_kind)
            _plan.datasets[0].data.push(i.total_plan)
            _plan.datasets[0].backgroundColor.push(getColorByName(i.total_kind))
            _plan.datasets[0].hoverBackgroundColor.push(getColorByName(i.total_kind))
        }

        setFactDiagram(_fact)
        setPlanDiagram(_plan)
        setComposedDiagram({
            labels: _fact.labels,
            datasets: [_fact.datasets[0], _plan.datasets[0]]
        })
    }, [data])
    async function getPlaned() {
        try {
            setPlanedLoading(true)
            let { data, error, status } = await supabase
                .from('plan')
                .select(`id,label,amount,created_at,kind`)
                .gte('created_at', period[0].toISOString())
                .lte('created_at', period[1].toISOString())
            if (error && status !== 406) throw error
            if (data) setPlanTable(data)
        } catch (error) {
            setMessage(error.error_description || error.message)
            setErrorVisible(true)
        } finally {
            setPlanedLoading(false)
        }
    }

    async function getFacts() {
        try {
            setFactsLoading(true)
            let { data, error, status } = await supabase
                .from('fact')
                .select(`id,label,amount,created_at,kind`)
                .gte('created_at', period[0].toISOString())
                .lte('created_at', period[1].toISOString())
            if (error && status !== 406) throw error
            if (data) setFactTable(data)
        } catch (error) {
            setMessage(error.error_description || error.message)
            setErrorVisible(true)
        } finally {
            setFactsLoading(false)
        }
    }

    async function getData() {
        try {
            setDataLoading(true)
            let { data, error, status } = await supabase.rpc('total_by_period', {
                _to: period[1].toISOString(),
                _from: period[0].toISOString()
            })
            if (error && status !== 406) throw error
            if (data) setData(data)
        } catch (error) {
            alert(error.message)
        } finally {
            setDataLoading(false)
        }
    }

    async function addRecord(dest, label, amount, kind) {
        try {
            setFactsLoading(true)
            let { data, error, status } = await supabase
                .from(dest).insert([{ label, amount, kind }])
            if (error && status !== 406) throw error
            getData()
            getPlaned()
            getFacts()
        } catch (error) {
            setMessage(error.error_description || error.message)
            setErrorVisible(true)
        } finally {
            setFactsLoading(false)
        }
    }

    const openAddPlanHandler = () => setAddPlanVisible(true)
    const openAddFactHandler = () => setAddFactVisible(true)

    const closeAddPlanHandler = () => setAddPlanVisible(false)
    const closeAddFactHandler = () => setAddFactVisible(false)

    const submitAddPlanHandler = (label, amount, kind) => {
        addRecord("plan", label, amount, kind)
        setAddPlanVisible(false)
    }
    const submitAddFactHandler = (label, amount, kind) => {
        addRecord("fact", label, amount, kind)
        setAddFactVisible(false)
    }

    const closeGreetingHandler = () => setGreetingsVisible(false)

    const openPeriodPickerHandler = () => setPeriodPickerVisible(true)
    const closePeriodPickerHandler = () => setPeriodPickerVisible(false)
    const submitPeriodPickerHandler = (from, to) => {
        setPeriod([from, to])
        setPeriodPickerVisible(false)
    }

    return (
        <Container gap={size == 'xs' ? 0 : 4} justify="flex-start">
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
            <ErrorModal
                closeHandler={errorCloseHandler}
                isVisible={isErrorVisible}
                message={errorMessage} />
            <SelectPeriodModal
                isVisible={isPeriodPickerVisible}
                closeHandler={closePeriodPickerHandler}
                submitHandler={submitPeriodPickerHandler}
            />
            <Spacer y={1} />
            <Grid.Container gap={0.7}>

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
                {mode == 'mdiagrams' ?<Grid xs={12}>
                    <Button
                        css={{ width: '100%' }}
                        onClick={openPeriodPickerHandler}
                        color='gradient'
                        auto>
                        {period[0].toDateString()}-{period[1].toDateString()}
                    </Button></Grid> : <></>}
                {mode == 'desktop' ? <>
                    <Grid md={3} xs={6}>
                        <DonutDiagram data={factDiagram} title="FACT SPENDING" />
                    </Grid>
                    <Grid md={3} xs={6}>
                        <DonutDiagram data={planDiagram} title="PLAN SPENDING" />
                    </Grid></> : <></>}
                {mode == 'desktop' || mode == 'mdiagrams' ? <>
                    <Grid md={6} xs={12}>
                        <BarDiagram data={composedDiagram} title="COMPARING" />
                    </Grid>
                    <Grid md={12} xs={12}>
                        <Col>
                            <TotalTable data={dataLoading ? [] : data} rowsPerPage={mode == 'desktop' ? 6 : 5} />
                        </Col>
                    </Grid>
                </> : <></>}

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
                        onClick={openAddPlanHandler}
                        color='gradient'
                        auto>
                        Add fact spending
                    </Button>
                </Grid> : <></>}

                {mode == 'desktop' || mode == 'mplan' ?
                    <Grid md={6} xs={12}>
                        <Col><SpendingTable
                            data={planedLoading ? [] : planTable}
                            rowsPerPage={mode == 'desktop' ? 10 : 11}
                            size={size} /></Col>
                    </Grid> : <></>
                }
                {mode == 'desktop' || mode == 'mfact' ?
                    <Grid md={6} xs={12}>
                        <Col><SpendingTable
                            data={factsLoading ? [] : factTable}
                            rowsPerPage={mode == 'desktop' ? 10 : 11}
                            size={size} /></Col>
                    </Grid> : <></>
                }
                {mode == 'desktop' ? <Grid md={12} xs={12}><Footer logout={logout} /></Grid> : <></>}
            </Grid.Container>

        </Container>)
}
