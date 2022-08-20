import { useState, useEffect } from 'react'
import Budget from '../components/Budget'
import { Button, Col, Container, Input, Link, Row, Spacer, Text, Textarea } from '@nextui-org/react'
import { store } from '../store/Store'
import { observer } from 'mobx-react-lite'
import useAdaptivity from '../utils/hooks/useAdaptivity'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'



export default function Report() {
    const router = useRouter()
    const {t} = useTranslation('common')
    const size = useAdaptivity()
    const [message, setMessage] = useState()
    const [error, setError] = useState()
    return (
        <Container fluid alignItems='center' justify='center' className="container">
            <Col>
                <Spacer y={3} />
                <Row>
                    <Text size={28}>{t('BugReportTitle')}</Text>
                </Row>
                <Row>
                    <Text size={16}>{t('BugReportSubtitle')}</Text>
                </Row>
                <Spacer y={2} />
                <Row>
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={9}
                        cols={70}
                        label={t('BugReportMessageLabel')}
                        placeholder={t('BugReportMessagePlaceholder')}
                    />
                </Row>
                <Spacer y={1} />
                <Row>
                    <Textarea
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                        rows={9}
                        cols={70}
                        label={t('BugReportErrorLabel')}
                        placeholder={t('BugReportErrorPlaceholder')}
                    />
                </Row>
                <Spacer y={1.5} />
                <Row>
                    <Button
                        css={size == 'xs' ? { width: "100%" } : undefined}
                        onPress={() => {
                            store.reportBug(message, error)
                            router.push('/')
                        }}
                        >
                        {t('buttonReport')}
                    </Button>
                </Row>
                <Spacer y={0.5} />
                <Row>
                    <Button
                        css={size == 'xs' ? { width: "100%" } : undefined}
                        onPress={() => { router.push('/') }}
                        color="error"
                        flat
                        >
                        {t('buttonClose')}
                    </Button>
                </Row>
            </Col>
        </Container>
    )
}