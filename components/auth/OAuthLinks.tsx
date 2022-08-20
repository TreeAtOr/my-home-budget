import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Row, Spacer } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";
import { store } from "../../store/Store";
interface IOAuthLinksProps { };

export const OAuthLinks: FC<IOAuthLinksProps> = (props) => {
    const { t } = useTranslation('common');

    return (
        <Container>
            <Spacer y={0.5} />
            <Row justify="center"><Button color="primary" onClick={(e) => {
                e.preventDefault()
                store.handleOAuth("google")
            }}>{t('SignWithGoogle')}<Spacer y={0.5} /><FontAwesomeIcon icon={faGoogle} /></Button></Row>
        </Container>
    );
}
