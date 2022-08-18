import { Col, Grid } from "@nextui-org/react"
import { ChartData } from "chart.js"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { recordsStore } from "../store/RecordsStore"
import { LayoutMode } from "../utils/hooks/useAdaptiveMode"
import BarDiagram from "./diagrams/BarDiagram"
import DoughnutDiagram from "./diagrams/DoughnutDiagram"
import { TotalTable } from "./tables/TotalTable"

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

export interface ITotalOverviewProps {
    mode: LayoutMode
}
export const TotalOverview = observer(function({ mode }: ITotalOverviewProps) {
    const [factDiagram, setFactDiagram] = useState<ChartData<"doughnut", number[], unknown>>()
    const [planDiagram, setPlanDiagram] = useState<ChartData<"doughnut", number[], unknown>>()
    const [composedDiagram, setComposedDiagram] = useState<ChartData<"bar", number[], unknown>>()

    const { t } = useTranslation('common');

    useEffect(() => {
        if (recordsStore.total === undefined) return
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

        for (let i of recordsStore.total) {
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
    }, [recordsStore.total])

    return (<>
        {mode == 'desktop' ? <>
            <Grid md={3} xs={6}>
                <DoughnutDiagram data={factDiagram} title={t('FactSpendingHeader')} />
            </Grid>
            <Grid md={3} xs={6}>
                <DoughnutDiagram data={planDiagram} title={t('PlanSpendingHeader')} />
            </Grid></> : <></>}
        {mode == 'desktop' || mode == 'mdiagrams' ? <>
            <Grid md={6} xs={12}>
                <BarDiagram data={composedDiagram} title={t('ComparingHeader')} />
            </Grid>
            <Grid md={12} xs={12}>
                <Col>
                    <TotalTable data={recordsStore.total} rowsPerPage={mode == 'desktop' ? 6 : 5} />
                </Col>
            </Grid>
        </> : <></>}
    </>)
})