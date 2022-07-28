import { Container, Card, useTheme, Text, Row } from '@nextui-org/react';
import { Doughnut } from 'react-chartjs-2';

export default function DonutDiagram({ data, title }) {
    console.log(data);
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