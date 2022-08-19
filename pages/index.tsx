import { useState, useEffect } from 'react'
import Auth from '../components/Auth'
import Budget from '../components/Budget'
import { Button, Card, Col, Container, Grid, Image, Link, Row, Spacer, Text } from '@nextui-org/react'
import { store } from '../store/Store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faDiagramProject, faList, faMobile, faSignIn, faTable, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/ui/Footer'
import useAdaptivity from '../utils/hooks/useAdaptivity'

export default observer(function Home() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const size = useAdaptivity()
  useEffect(()=> {
    
  })
  const handleLogInButton = () => {
    if (store.session) router.push('/overview')
    else router.push('/auth')
  }
  return (
    <Container fluid alignItems='center' justify='center' className="container" gap={size == 'xs' ? 0 : 2}>
      <Row>
        <Card>
          <Card.Body>
            <Row justify='space-between'>
              <Text h3 css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}>My Home Budget</Text>
              {size == 'xs' ?
                <Button color='gradient' onPress={handleLogInButton} auto><FontAwesomeIcon icon={faSignIn} /></Button> :
                <Button color='gradient' onPress={handleLogInButton}>{t('buttonLogIn')}</Button>}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={9} />
      <Row gap={3} >
        <Grid.Container justify='center' alignContent='center' alignItems='center'>
          <Grid xs={12} sm={7}>
            <Col>
              <Text h1>TreeAtOr`s My Home Budget</Text>
              <Text h4 color='grey'>{t('Subtitle')}</Text>
            </Col>
          </Grid>
          <Grid xs={0} sm={5}>
            {size != 'xs' ? <Image height={324} src='/images/hero-image.png' /> : <></>}
          </Grid>
        </Grid.Container>
      </Row>
      <Spacer y={9} />
      <Row>
        <Col>
          <Row justify='center'>
            <Text h2>{t('CoreFeatures')}</Text>
          </Row>
          <Spacer y={1} />
          <Grid.Container gap={3}>
            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faTable} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('PlanNFactFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('PlanNFactFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faDiagramProject} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('TotalFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('TotalFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faList} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('KindsFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('KindsFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faCalculator} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('MetricsFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('MetricsFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faUserGroup} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('CollaborationFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('CollaborationFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={12} sm={6} md={4} xl={2} >
              <Card>
                <Card.Header>
                  <FontAwesomeIcon icon={faMobile} size="2x" color='grey' />
                  <Spacer x={0.3} />
                  <Text>{t('NativeFeatureHeader')}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('NativeFeatureBody')}</Text>
                </Card.Body>
              </Card>
            </Grid>

          </Grid.Container>
        </Col>

      </Row>
      <Spacer y={1} />
      <Row>
        <Col>
          <Row justify='center'>
            <Text h2>{t('CreatedWith')}</Text>
          </Row>
          <Spacer y={1} />
          <Grid.Container gap={3}>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Image height={100} src="/images/nextjs.svg" />
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('NextjsDescription')}</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Image height={100} src="/images/supabase.svg" />
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('SupabaseDescription')}</Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Image height={100} src="/images/mobx.svg" />
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ height: 140 }}>
                  <Text size={18}>{t('MobxDescription')}</Text>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Col>
      </Row>
      <Footer />
    </Container >
  )
})