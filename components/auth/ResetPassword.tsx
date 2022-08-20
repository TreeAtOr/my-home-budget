import { Button, Container, Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { store } from "../../store/Store";
import { Sizes } from "../../utils/types";
import { MagicLinkModal } from "../modals/MagicLinkModal";

interface ResetPasswordProps {
    size: Sizes
}
export default observer(function ResetPassword({ size }: ResetPasswordProps) {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const alertCloseHandler = () => setAlertVisible(false);
    const [password, setPassword] = useState('')

    const { t } = useTranslation('common');
    const router = useRouter()
    return (
        <Container>
            <MagicLinkModal closeHandler={alertCloseHandler} isVisible={isAlertVisible} />
            <Row justify="center" >
                <Text size={16}>{t('ResetPasswordContent')}</Text>
            </Row>
            <Spacer y={2} />
            <Grid.Container justify="center" >
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
                            store.updatePassword(password)
                            router.push('/overview')
                        }}
                        size="md"
                    >
                        <span>{t('ResetPassword')}</span>
                    </Button>
                </Grid>
            </Grid.Container>
        </Container>
    )
})