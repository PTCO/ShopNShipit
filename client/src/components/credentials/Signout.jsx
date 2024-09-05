import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";

const Signout = () => {
    const { actions , user } = useContext(UserContext);
    useEffect(()=>{
        setTimeout(() => {
            if (user && user.User_ID) return actions.signout(user.User_ID);
            actions.navigate('/Login')
        }, 2000);
    }, [])
    return (
        <div className="w-100 h-100 d-flex justify-content-center pt-1 px-4">
            <p className="fs-4">User is being logged out <i className="fa-solid fa-spinner fa-spin "></i></p>
        </div>
    )
}

export default Signout;