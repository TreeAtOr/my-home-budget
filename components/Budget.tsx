import { Text, Table, Container, Grid, Row, Col, Spacer, Button, Card, Link } from '@nextui-org/react';
import { useState, useEffect, useMemo } from 'react'
import { AddRecordModal } from './modals/AddRecordModal';
import { SpendingTable } from './tables/SpendingTable';
import Footer from './ui/Footer'
import { useAdaptiveMode } from '../utils/hooks/useAdaptiveMode';
import BudgetHeader from './BudgetHeader';
import { observer } from 'mobx-react-lite';
import { recordsStore } from '../store/RecordsStore';
import { TotalOverview } from './TotalOverview'
import { ITableRecord } from '../types/ITableRecord';

interface IBudgetProps {}
export default observer(
    function Budget({ }: IBudgetProps) {
        const [mode, setMode] = useAdaptiveMode('desktop') //'mfact' 'mplan', 'mdiagrams'



        const [recordToEdit, setRecordToEdit] = useState<ITableRecord>()
        const [isEditFactVisible, setEditFactVisible] = useState(false)
        const [isEditPlanVisible, setEditPlanVisible] = useState(false)


        const onEditFactRecordOpen = (item: ITableRecord) => {
            setRecordToEdit(item)
            setEditFactVisible(true)
        }

        const onEditFactRecordClose = () => {
            setEditFactVisible(false)
            setRecordToEdit(undefined)
        }

        const onEditFactRecordSubmitted = (item) => {
            recordsStore.updateRecord("fact", item)
            setEditFactVisible(false)
            setRecordToEdit(undefined)
        }

        const onEditPlanRecordOpen = (item) => {
            setEditPlanVisible(true)
            setRecordToEdit(item)
            console.log(item);
        }

        const onEditPlanRecordClose = () => {
            setEditPlanVisible(false)
            setRecordToEdit(undefined)
        }

        const onEditPlanRecordSubmitted = (item) => {
            recordsStore.updateRecord("plan", item)
            setEditPlanVisible(false)
            setRecordToEdit(undefined)
        }

        const onDeletePlanRecord = (id: number) => recordsStore.deleteRecord("plan", id)
        const onDeleteFactRecord = (id: number) => recordsStore.deleteRecord("fact", id)

        return (
            <Container gap={mode !== 'desktop' ? 0 : 4} justify="flex-start">
                <AddRecordModal
                    state={recordToEdit}
                    closeHandler={onEditFactRecordClose}
                    submitHandler={onEditFactRecordSubmitted}
                    isVisible={isEditFactVisible}
                />
                <AddRecordModal
                    state={recordToEdit}
                    closeHandler={onEditPlanRecordClose}
                    submitHandler={onEditPlanRecordSubmitted}
                    isVisible={isEditPlanVisible}
                />
                <Spacer y={mode == 'desktop' ? 1 : 0} />
                <Grid.Container gap={0.7}>
                    <BudgetHeader
                        mode={mode}
                        setMode={setMode}
                    />
                    <TotalOverview mode={mode} />


                    {mode == 'desktop' || mode == 'mplan' ?
                        <Grid md={6} xs={12}>
                            <Col><SpendingTable
                                onDelete={onDeletePlanRecord}
                                onEdit={onEditPlanRecordOpen}
                                data={recordsStore.records.get("plan")}
                                rowsPerPage={mode == 'desktop' ? 10 : 11}
                            /></Col>
                        </Grid> : <></>
                    }
                    {mode == 'desktop' || mode == 'mfact' ?
                        <Grid md={6} xs={12}>
                            <Col><SpendingTable
                                onDelete={onDeleteFactRecord}
                                onEdit={onEditFactRecordOpen}
                                data={recordsStore.records.get("fact")}
                                rowsPerPage={mode == 'desktop' ? 10 : 11}
                            /></Col>
                        </Grid> : <></>
                    }
                    {mode == 'desktop' ? <Grid md={12} xs={12}><Footer /></Grid> : <></>}
                </Grid.Container>
            </Container>)
    })
