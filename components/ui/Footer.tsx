import { Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import setLanguage from 'next-translate/setLanguage'
import { store } from '../../store/Store'
import { observer } from 'mobx-react-lite'

export default observer(
    function Footer() {
        const router = useRouter()
        return (<>
            <Spacer y={3} />
            <Row justify='space-between'>
                <Spacer x={3} />
                <Col><Text color='gray'>Copyright TreeAtOr 2022©</Text></Col>
                <Col>
                    <Row><Text>On other languages</Text></Row>
                    <Row><Link onClick={() => setLanguage('en')}>English</Link></Row>
                    <Row><Link onClick={() => setLanguage('ru')}>Русский</Link></Row>
                </Col>
                <Col>
                    <Row><Spacer x={1} /></Row>
                    <Row><Link onClick={() => store.supabase.auth.signOut()}>Logout</Link><Spacer x={2} /></Row>
                    <Row><Link onClick={() => router.push('/report')}>Report bug</Link></Row>
                </Col>
            </Row>
        </>)
    })