"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

const User = () => {
    const {data: session} = useSession()
    console.log(session?.user)
    return (
        <div>
            <pre>{session?.user.email}</pre>
            <pre>{session?.user.role}</pre>
            <Button className="mb-5" type="submit" onClick={() => signOut({
                redirect: true, 
                callbackUrl: `${window.location.origin}/sign-in`
            })}>Sign out</Button>
        </div>
    )
}

export default User