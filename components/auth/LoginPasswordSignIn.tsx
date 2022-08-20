import { Link, Spacer } from "@nextui-org/react"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { store } from "../../store/Store"
import { Sizes } from "../../utils/types"
import ResetPasswordModal from "../modals/ResetPasswordModal"
import LoginPasswordForm from "../ui/LoginPasswordForm"


interface LoginPasswordSignInProps {
    size: Sizes
}
export default observer(function LoginPasswordSignIn({ size }: LoginPasswordSignInProps) {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [isVisible, setIsVisible] = useState(false)
    return (<>
        <ResetPasswordModal 
        isVisible={isVisible} 
        closeHandler={() => setIsVisible(false) }
        />
        <LoginPasswordForm size={size} action={(email, password) => {
            store.handlePasswordLogin(email, password)
            router.push('overview')
        }}>
            <Link onClick={() => setIsVisible(true)}>{t('ResetPassword')}</Link>
        </LoginPasswordForm>
    </>
    )
})