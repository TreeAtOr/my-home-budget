import { useState, useEffect } from 'react'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import { recordsStore } from '../store/RecordsStore'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router';


export default observer(function Home() {
    const router = useRouter()
    useEffect(() => {
        if (!recordsStore.session) router.push('/auth')
    })

    return (
        <Container fluid alignItems='center' justify='center' className="container" style={{ padding: '0 0 0 0' }}>
            <Budget
                key={recordsStore.session?.user.id}
            />
        </Container>
    )
})