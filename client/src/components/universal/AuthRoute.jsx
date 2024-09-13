import { useContext, useEffect } from "react"
import UserContext from "../../context/userContext"
import { Outlet } from "react-router-dom";

const AuthRoute = () => {
    const { user , actions, location } = useContext(UserContext);
    useEffect(()=>{
        if(!user) {
            actions.navigate("/NotAuth", {state: location.pathname})
        }
    }, [])
    if(user) {
        return <Outlet />
    }
}

export default AuthRoute;