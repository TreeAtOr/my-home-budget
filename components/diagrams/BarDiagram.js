import { Container, Card, useTheme, Text, Row } from '@nextui-org/react';
import { Bar } from 'react-chartjs-2';

export default function BarDiagram({ data, title }) {
    return (
        <Card  css={{ mw: "925px" }}>
            <Card.Header>
                <Row justify='center'>
                <Text size={16} b color='grey'>{title}</Text>
                </Row>
            </Card.Header>
            <Card.Body>
                {data?<Bar data={data}/>: <Container fluid alignContent='center' justify='center'><Text size={18}>You have nothing to show, yet</Text></Container>}
            </Card.Body>
        </Card>)
};