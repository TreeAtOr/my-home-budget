import { Button, Container, Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { store } from "../../store/Store";
import { Sizes } from "../../utils/types";
import { MagicLinkModal } from "../modals/MagicLinkModal";

interface MagicLinkModalProps {
    size: Sizes
}
export default observer(function MagicLinkAuth({ size }: MagicLinkModalProps) {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const alertCloseHandler = () => setAlertVisible(false);
    const [email, setEmail] = useState('')

    const { t } = useTranslation('common');

    return (
        <Container>
            <MagicLinkModal closeHandler={alertCloseHandler} isVisible={isAlertVisible} />
            <Row justify="center" >
                <Text size={16}>{t('SignMagicLink')}</Text>
            </Row>
            <Spacer y={2} />
            <Grid.Container justify="center" >
                <Grid sm={5} xs={12} justify={size === 'xs' ? "center" : "flex-end"}  >
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
                <Grid sm={5} xs={12} justify={size === 'xs' ? "center" : "flex-start"} >
                    <Button
                        css={size === 'xs' ? { width: "100%" } : undefined}
                        onClick={(e) => {
                            e.preventDefault()
                            store.handleLogin(email)
                        }}
                        size="md"
                    >
                        <span>{t('SendMagicLink')}</span>
                    </Button>
                </Grid>
            </Grid.Container>
        </Container>
    )
})