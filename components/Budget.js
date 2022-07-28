import { Text, Table, Container, Grid, Row, Col, Spacer, Button, Card } from '@nextui-org/react';
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../utils/supabaseClient'
import BarDiagram from './diagrams/BarDiagram';
import DonutDiagram from './diagrams/DonutDiagram';
import { AddRecordModal } from './modals/AddRecordModal';
import { ErrorModal } from './modals/ErrorModal';
import { SpendingTable } from './tables/SpendingTable';
import { TotalTable } from './tables/TotalTable';

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

export default function Budget({ session }) {
    const [dataLoading, setDataLoading] = useState(true)
    const [planedLoading, setPlanedLoading] = useState(true)
    const [factsLoading, setFactsLoading] = useState(true)

    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setMessage] = useState('');

    const [isAddPlanVisible, setAddPlanVisible] = useState(false);
    const [isAddFactVisible, setAddFactVisible] = useState(false);

    const [data, setData] = useState()
    const [factDiagram, setFactDiagram] = useState()
    const [planDiagram, setPlanDiagram] = useState()
    const [composedDiagram, setComposedDiagram] = useState()

    const [planTable, setPlanTable] = useState([])
    const [factTable, setFactTable] = useState([])

    const errorCloseHandler = () => setErrorVisible(false)

    useEffect(() => {
        getData()
        getPlaned()
        getFacts()
    }, [session])

    useEffect(() => {
        if (!data) return
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
            _fact.labels.push(i.kind)
            _fact.datasets[0].data.push(i.fact)
            _fact.datasets[0].backgroundColor.push(getColorByName(i.kind))
            _fact.datasets[0].hoverBackgroundColor.push(getColorByName(i.kind))

            _plan.labels.push(i.kind)
            _plan.datasets[0].data.push(i.plan)
            _plan.datasets[0].backgroundColor.push(getColorByName(i.kind))
            _plan.datasets[0].hoverBackgroundColor.push(getColorByName(i.kind))
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
            let { data, error, status } = await supabase
                .from('total')
                .select(`kind, plan,fact,percentage`)
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

    return (
        <Container gap={4} justify="flex-start">
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
            <Row gap={2}>
                <Card color='primary'>
                    <Card.Body>
                        <Row justify='space-between'>
                            <Spacer x={1} />
                            <Col><Text b size={24} color="gray">{"Your budget overview".toUpperCase()}</Text></Col>
                            <Button onClick={openAddPlanHandler} color='gradient'>Add planing spending</Button>
                            <Spacer x={1} />
                            <Button onClick={openAddFactHandler} color='primary'>Add fact spending</Button>
                        </Row>

                    </Card.Body>
                </Card>
                <Spacer x={1} />

            </Row>
            <Spacer y={1} />

            <Row justify="space-around" gap={2}>
                <DonutDiagram data={factDiagram} title="FACT SPENDING" />
                <Spacer x={2} />
                <DonutDiagram data={planDiagram} title="PLAN SPENDING" />
                <Spacer x={2} />
                <BarDiagram data={composedDiagram} title="COMPERING" />
                <Spacer x={1} />
            </Row>
            <Spacer y={1} />
            <Row gap={1}><Col><TotalTable data={dataLoading?[]:data} rowsPerPage={6} /></Col></Row>

            <Spacer y={1} />
            <Row gap={1}>
                <Col><SpendingTable data={planedLoading?[]:planTable} rowsPerPage={10} /></Col>
                <Col><SpendingTable data={factsLoading?[]:factTable} rowsPerPage={10} /></Col>
            </Row>
        </Container>)
}
