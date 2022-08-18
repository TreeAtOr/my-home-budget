import { Container, Card, useTheme, Text, Row } from '@nextui-org/react';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface IDoughnutDiagramProps {
    data: ChartData<"doughnut", number[], unknown>,
    title: string
}


export default function DoughnutDiagram({ data, title }: IDoughnutDiagramProps) {
    return (
        <Card css={{ mw: "429px", mh: "493px" }}>
            <Card.Header>
                <Row justify='center'>
                    <Text size={16} b color='grey'>{title}</Text>
                </Row>
            </Card.Header>
            <Card.Body>
                <Doughnut data={data?data:{labels: [], datasets:[]}} />
            </Card.Body>
        </Card>)
};