import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { ErrorModal } from './modals/ErrorModal';
import { Container, Text, Input, Button, Spacer, Row, Col } from "@nextui-org/react";

import { MagicLinkModal } from './modals/MagicLinkModal';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setMessage] = useState('');


  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      setAlertVisible(true)
    } catch (error) {
      setMessage(error.error_description || error.message)
      setErrorVisible(true)
    } finally {
      setLoading(false)
    }
  }

  const alertCloseHandler = () => setAlertVisible(false);
  const errorCloseHandler = () => setErrorVisible(false)

  return (
    <Container fluid alignItems="center" justify='center'>
      <MagicLinkModal closeHandler={alertCloseHandler} isVisible={isAlertVisible} />
      <ErrorModal closeHandler={errorCloseHandler} isVisible={isErrorVisible} message={errorMessage} />

      <Row justify="center" >
        <Text size={32} b>My Home Budget</Text>
      </Row>
      <Row justify="center" >
        <Text size={16}>Sign in via magic link with your email below</Text>
      </Row>
      <Spacer y={2} />
      <Row justify="center" >
        <Input
          size="md"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Spacer y={0.5} />
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          size="md"
          disabled={loading}
        >
          <span>{loading ? 'Loading' : 'Send magic link'}</span>
        </Button>
      </Row>
    </Container>
  )
}