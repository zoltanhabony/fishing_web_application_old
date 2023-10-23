import { ReactNode,FC } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
    return(<div className="bg-violet-200 p-10 rounded-md">{children}</div>)
}

export default AuthLayout