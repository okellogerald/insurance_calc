import { Button } from "@/components/ui/button"
import { AuthManager, useUserStore } from "@/features/auth/auth_manager"
import { useNavigate } from "react-router"

export default function HomePage() {
    const user = useUserStore()
    const navigate = useNavigate()

    const logOut = () => {
        AuthManager.instance.logOut()
        navigate('/login')
    }

    return <>
        <div className="m-20">
            <h1>HOMEPAGE</h1>
            <p>id: {user?.id}</p>
            <p>email: {user?.email}</p>
            <Button variant={"destructive"} onClick={logOut}>Log Out</Button>
        </div>
    </>
}