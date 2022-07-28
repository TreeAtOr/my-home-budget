import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Container } from '@nextui-org/react'

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
    </Container>
  )
}