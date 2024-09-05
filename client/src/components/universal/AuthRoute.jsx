import { useContext, useEffect } from "react"
import UserContext from "../../context/userContext"
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const { user , location } = useContext(UserContext);

    if(user) {
        return <Outlet />
    } else {
        setTimeout(() => {
            return <Navigate to={"/NotAuth"} state={location.pathname}/>
        }, 2000);
    }
}

export default AuthRoute;