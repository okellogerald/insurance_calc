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

    const calc = () => {
        navigate('/calculator')
    }

    return <>
        <div className="m-20">
            <h1>HOMEPAGE</h1>
            <p>id: {user?.id}</p>
            <p>email: {user?.email}</p>
            <div className="flex flex-col">
                <Button className="mb-10 mt-10" onClick={calc}>Go to the calculator</Button>
                <Button variant={"destructive"} onClick={logOut}>Log Out</Button>
            </div>
        </div>
    </>
}