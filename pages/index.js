import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Col, Container, Link, Row, Spacer,Text } from '@nextui-org/react'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Container fluid alignItems='center' justify='center' className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Budget key={session.user.id} session={session} />}

      <Spacer y={3} />
      <Row justify='space-between'>
        <Spacer x={3} />
        <Col><Text color='gray'>Copyright TreeAtOr 2022©</Text></Col>
        <Link onClick={()=> {
          supabase.auth.signOut()
          setSession(null)
        }}>Logout</Link><Spacer x={2} /></Row>
    </Container>
  )
}