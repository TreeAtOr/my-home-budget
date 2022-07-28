import { Container, Card, useTheme, Text, Row } from '@nextui-org/react';
import { Doughnut } from 'react-chartjs-2';

export default function DonutDiagram({ data, title }) {
    console.log(data);
    return (
        <Card  css={{ mw: "429px" }}>
            <Card.Header>
                <Row justify='center'>
                <Text size={16} b color='grey'>{title}</Text>
                </Row>
            </Card.Header>
            <Card.Body>
                {data?<Doughnut data={data}/>: <Container fluid alignContent='center' justify='center'><Text size={18}>You have nothing to show, yet</Text></Container>}
            </Card.Body>
        </Card>)
};