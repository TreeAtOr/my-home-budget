import { Container, Card, useTheme, Text, Row, Col } from '@nextui-org/react';
import { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
interface IBarDiagramProps {
    data: ChartData<"bar", number[], unknown>,
    title: string
}

export default function BarDiagram({ data, title }: IBarDiagramProps) {
    return (
        <Card css={{ mw: "925px", mh:"493px" }}>
            <Card.Header>
                <Row justify='center'>
                    <Text size={16} b color='grey'>{title}</Text>
                </Row>
            </Card.Header>
            <Card.Body>
                <Bar data={data?data:{ labels: [], datasets:[]}} />
            </Card.Body>
        </Card>)
};