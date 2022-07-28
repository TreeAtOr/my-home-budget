import { Text, Table, Container, Grid, Row, Col, Spacer } from '@nextui-org/react';
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../utils/supabaseClient'
import BarDiagram from './diagrams/BarDiagram';
import DonutDiagram from './diagrams/DonutDiagram'
import { SpendingTable } from './tables/SpendingTable';
import { TotalTable } from './tables/TotalTable';

const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    legend: {
        display: true,
    },

    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const columns = [
    {
        key: "kind",
        label: "LABELS",
    },
    {
        key: "plan",
        label: "PLAN",
    },
    {
        key: "fact",
        label: "FACT",
    },
];
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
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [factDiagram, setFactDiagram] = useState()
    const [planDiagram, setPlanDiagram] = useState()
    const [composedDiagram, setComposedDiagram] = useState()

    const [planTable, setPlanTable] = useState([])
    const [factTable, setFactTable] = useState([])



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
            setLoading(true)
            let { data, error, status } = await supabase
                .from('plan')
                .select(`id,label,amount,created_at,kind`)
            if (error && status !== 406) {
                throw error
            }

            if (data) setPlanTable(data)

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function getFacts() {
        try {
            setLoading(true)
            let { data, error, status } = await supabase
                .from('fact')
                .select(`id,label,amount,created_at,kind`)
            if (error && status !== 406) {
                throw error
            }
            if (data) setFactTable(data)

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function getData() {
        try {
            setLoading(true)
            let { data, error, status } = await supabase
                .from('total')
                .select(`kind, plan,fact,percentage`)
            if (error && status !== 406) {
                throw error
            }

            if (data) setData(data)

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <Container gap={4} justify="flex-start">
            <Row justify="space-around" gap={2}>
                <DonutDiagram data={factDiagram} title="FACT SPENDING" />
                <Spacer x={2} />
                <DonutDiagram data={planDiagram} title="PLAN SPENDING" />
                <Spacer x={2} />
                <BarDiagram data={composedDiagram} title="COMPERING"  />
                <Spacer x={1} />
            </Row>
            <Spacer y={1} />
            <Row gap={1}><Col><TotalTable data={data} rowsPerPage={6} /></Col></Row>

            <Spacer y={1} />
            <Row gap={1}>
                <Col><SpendingTable data={planTable} rowsPerPage={10} /></Col>
                <Col><SpendingTable data={factTable} rowsPerPage={10} /></Col>
            </Row>
        </Container>)

}
