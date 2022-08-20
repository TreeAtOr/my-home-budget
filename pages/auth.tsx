import { useState, useEffect } from 'react'

import { Button, Col, Container, Link, Row, Spacer, Text } from '@nextui-org/react'
import { store } from '../store/Store'
import { observer } from 'mobx-react-lite'
import MagicLinkAuth from '../components/auth/MagicLinkAuth'
import useAdaptivity from '../utils/hooks/useAdaptivity'
import { OAuthLinks } from '../components/auth/OAuthLinks'
import LoginPasswordSignIn from '../components/auth/LoginPasswordSignIn'
import LoginPasswordSignUp from '../components/auth/LoginPasswordSignUp'
import ResetPassword from '../components/auth/ResetPassword'

export default observer(function Home() {
    const size = useAdaptivity()
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isMagic, setIsMagic] = useState<boolean>(false);
    return (
        <Container fluid alignItems='center' justify='center' className="container" style={{ padding: '0 0 0 0' }}>
            <Container alignItems="center" css={{ height: '80vh', display: 'flex', justifyContent: 'center' }}>
                <Container>
                    <Row justify="center" >
                        <Text size={32} b>My Home Budget</Text>
                    </Row>
                    {
                        store.auth_state == "PASSWORD_RECOVERY" ? <>
                            <ResetPassword size={size} />
                        </> : 
                        <>
                            <Row justify="center" >
                                <Button.Group size='sm'>
                                    <Button bordered={isMagic} onPress={() => setIsMagic(false)}>Password</Button>
                                    <Button bordered={!isMagic} onPress={() => setIsMagic(true)}>Magic</Button>
                                </Button.Group>
                            </Row>
                            {isMagic ? <LoginPasswordSignUp size={size} /> : <LoginPasswordSignIn size={size} />}
                        </>
                    }


                    <Spacer y={0.5} />
                    {store.auth_state == "PASSWORD_RECOVERY" ? <></>: 
                    <>
                    <Row justify="center"><Text size={18} color="gray">OR</Text></Row>
                    <OAuthLinks />
                    </>}
                </Container>
            </Container>
        </Container>
    )
})