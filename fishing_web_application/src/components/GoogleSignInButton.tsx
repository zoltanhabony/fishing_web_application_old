import { ReactNode, FC } from "react"
import { Button } from "./ui/button"

interface GSingInButtonProps {
    children : ReactNode
}

const GoogleSingInButton: FC<GSingInButtonProps> = ({children}) =>{

    const loginWithGoogle = () => {console.log('Test login with google')}
    return (
        <Button className="w-full bg-sky-700"onClick={loginWithGoogle}>{children}</Button>
    )
}

export default GoogleSingInButton