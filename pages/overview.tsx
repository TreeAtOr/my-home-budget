import { useState, useEffect } from 'react'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import { store } from '../store/Store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router';


export default observer(function Home() {
    const router = useRouter()
    useEffect(() => {
        if (!store.session) router.push('/auth')
    })

    return (
        <Container fluid alignItems='center' justify='center' className="container" style={{ padding: '0 0 0 0' }}>
            <Budget
                key={store.session?.user.id}
            />
        </Container>
    )
})