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
import { useLocalStorage } from '../utils/hooks/useLocalStorage';
import { useRecordsTableHelper } from '../utils/hooks/useRecordsTableHelper';
import { useAdaptiveMode } from '../utils/hooks/useAdaptiveMode';
import { TotalOverview } from './TotalOverview';
import BudgetHeader from './BudgetHeader';

export default function Budget({ session, logout }) {
    const [dataLoading, setDataLoading] = useState(true)

    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setMessage] = useState('');


    const [data, setData] = useState()


    const [period, setPeriod] = useState([new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date(Date.now())])

    const [mode, setMode] = useAdaptiveMode('desktop') //'mfact' 'mplan', 'mdiagrams'

    const [RecordToEdit, setRecordToEdit] = useState()

    const errorCloseHandler = () => setErrorVisible(false)

    const setError = useMemo(() => (error) => {
        if (!error) setErrorVisible(false)
        else {
            setMessage(error.error_description || error.message)
            setErrorVisible(true)
        }
    }, [])

    const onUpdate = useMemo(() => () => getData(), [])

    const [
        planLoading, planTable, addPlan, deletePlan
    ] = useRecordsTableHelper("plan", period, setError, onUpdate)

    const [
        factLoading, factTable, addFact, deleteFact
    ] = useRecordsTableHelper("fact", period, setError, onUpdate)




    useEffect(() => {
        getData()
    }, [session, period])


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



    const onEditFactRecordClose = () => {

    }

    const onDeletePlanRecord = (id) => deletePlan(id)
    const onDeleteFactRecord = (id) => deleteFact(id)


    return (
        <Container gap={mode !== 'desktop' ? 0 : 4} justify="flex-start">
            <ErrorModal
            closeHandler={errorCloseHandler}
            isVisible={isErrorVisible}
            message={errorMessage} />
            <Spacer y={mode == 'desktop' ? 1 : 0} />
            <Grid.Container gap={0.7}>
                <BudgetHeader
                    addPlan={addPlan}
                    addFact={addFact}
                    period={period}
                    setPeriod={setPeriod}
                    mode={mode}
                    setMode={setMode} 
                    />
                <TotalOverview mode={mode} data={data} dataLoading={dataLoading} />


                {mode == 'desktop' || mode == 'mplan' ?
                    <Grid md={6} xs={12}>
                        <Col><SpendingTable
                            onDelete={onDeletePlanRecord}
                            data={planLoading ? [] : planTable}
                            rowsPerPage={mode == 'desktop' ? 10 : 11}
                        /></Col>
                    </Grid> : <></>
                }
                {mode == 'desktop' || mode == 'mfact' ?
                    <Grid md={6} xs={12}>
                        <Col><SpendingTable
                            onDelete={onDeleteFactRecord}
                            data={factLoading ? [] : factTable}
                            rowsPerPage={mode == 'desktop' ? 10 : 11}
                        /></Col>
                    </Grid> : <></>
                }
                {mode == 'desktop' ? <Grid md={12} xs={12}><Footer logout={logout} /></Grid> : <></>}
            </Grid.Container>

        </Container>)
}
