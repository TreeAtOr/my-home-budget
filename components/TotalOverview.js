import { Col, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"
import BarDiagram from "./diagrams/BarDiagram"
import DonutDiagram from "./diagrams/DonutDiagram"
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


export function TotalOverview({ mode, data, dataLoading }) {
    const [factDiagram, setFactDiagram] = useState()
    const [planDiagram, setPlanDiagram] = useState()
    const [composedDiagram, setComposedDiagram] = useState()

    useEffect(() => {
        if (data === undefined) return
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

    return (<>
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
    </>)

}