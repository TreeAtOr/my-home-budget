import { useState } from 'react'
import { ErrorModal } from './modals/ErrorModal';
import { Container, Text, Input, Button, Spacer, Row, Col } from "@nextui-org/react";
import useTranslation from 'next-translate/useTranslation';
import { MagicLinkModal } from './modals/MagicLinkModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setMessage] = useState('');

  const { t } = useTranslation('common');

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

  const handleOAuth = async (provider) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ provider })
      if (error) throw error
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
    <Container alignItems="center" css={{ height: '80vh', display: 'flex', justifyContent: 'center' }}>
      <Container>
        <MagicLinkModal closeHandler={alertCloseHandler} isVisible={isAlertVisible} />
        <ErrorModal closeHandler={errorCloseHandler} isVisible={isErrorVisible} message={errorMessage} />

        <Row justify="center" >
          <Text size={32} b>My Home Budget</Text>
        </Row>
        <Row justify="center" >
          <Text size={16}>{t('SignMagicLink')}</Text>
        </Row>
        <Spacer y={2} />
        <Row justify="center" >
          <Input
            size="md"
            type="email"
            placeholder={t('placeholderEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer x={1} />
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            size="md"
            disabled={loading}
          >
            <span>{loading ? t('Loading') : t('SendMagicLink')}</span>
          </Button>
        </Row>
        <Spacer y={0.5} />
        <Row justify="center"><Text size={18} color="gray">OR</Text></Row>
        <Spacer y={0.5} />
        <Row justify="center"><Button color="primary" onClick={(e) => {
          e.preventDefault()
          handleOAuth("google")
        }} disabled={loading}>{t('SignWithGoogle')}<Spacer y={0.5} /><FontAwesomeIcon icon={faGoogle} /></Button></Row>
      </Container>
    </Container>
  )
}