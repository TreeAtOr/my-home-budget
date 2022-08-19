import { useState, useEffect } from 'react'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import { store } from '../store/Store'
import { observer } from 'mobx-react-lite'

export default observer(function Home() {
    return (
        <Container fluid alignItems='center' justify='center' className="container" style={{ padding: '0 0 0 0' }}>
            <Auth />
        </Container>
    )
})