import { Button, Container, Grid, Input, Link, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { store } from "../../store/Store";
import { Sizes } from "../../utils/types";
import { MagicLinkModal } from "../modals/MagicLinkModal";

interface ILoginPasswordProps {
    size: Sizes
    action: (email: string, password: string) => any,
    children?: any[] | any
}
export default observer(function MagicLinkAuth({ size, action, children }: ILoginPasswordProps) {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const alertCloseHandler = () => setAlertVisible(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { t } = useTranslation('common');

    return (
        <Container>
            <MagicLinkModal closeHandler={alertCloseHandler} isVisible={isAlertVisible} />
            <Row justify="center" >
                <Text size={16}>{t('SingPasswordEmail')}</Text>
            </Row>
            <Spacer y={2} />
            <Grid.Container justify="center" >
                <Grid xs={12} justify={"center"}  >
                    <Input
                        css={size === 'xs' ? { width: "100%" } : undefined}
                        size="md"
                        type="email"
                        placeholder={t('placeholderEmail')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Spacer x={2} />
                <Grid xs={12} justify={"center"}  >
                    <Input
                        css={size === 'xs' ? { width: "100%" } : undefined}
                        size="md"
                        type="password"
                        placeholder={t('placeholderPassword')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Spacer x={2} />
                <Grid xs={12} justify={"center"} >
                    <Button
                        css={size === 'xs' ? { width: "100%" } : undefined}
                        onClick={(e) => {
                            e.preventDefault()
                            action(email, password)
                        }}
                        size="md"
                    >
                        <span>{t('buttonLogIn')}</span>
                    </Button>
                </Grid>
                <Spacer y={1}/>
                <Grid xs={12} justify={"center"} >
                    {children}
                </Grid>
            </Grid.Container>
        </Container>
    )
})