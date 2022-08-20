import { Link } from "@nextui-org/react"
import { observer } from "mobx-react-lite"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { store } from "../../store/Store"
import { Sizes } from "../../utils/types"
import LoginPasswordForm from "../ui/LoginPasswordForm"


interface LoginPasswordSignUpProps {
    size: Sizes
}
export default observer(function LoginPasswordSignUp({ size }: LoginPasswordSignUpProps) {
    const router = useRouter()
    return (
        <LoginPasswordForm size={size} action={(email, password) => {
            store.handlePasswordSignUp(email, password)
            router.push('/overview')
        }} />
    )
})