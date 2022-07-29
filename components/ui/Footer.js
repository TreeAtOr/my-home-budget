import { Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'

export default function Footer({logout}) {
    return (<>
        <Spacer y={3} />
        <Row justify='space-between'>
            <Spacer x={3} />
            <Col><Text color='gray'>Copyright TreeAtOr 2022©</Text></Col>
            <Link onClick={logout}>Logout</Link><Spacer x={2} /></Row>
    </>)
}