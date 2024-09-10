import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import Logout_Moving_Cart from "../../assets/Logout_Moving_Cart.png";

const Signout = () => {
    const { actions , user } = useContext(UserContext);
    useEffect(()=>{
        setTimeout(() => {
            if (user && user.User_ID) return actions.signout(user.User_ID);
            actions.navigate('/Login')
        }, 2000);
    }, [])
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center pt-1 px-4">
            <h2 className="fs-1 mx-auto my-4 " style={{color: "#4d5c46"}}>Loggin <b className="text-black">User</b> <b style={{color: "#bd7c71"}}>Out</b></h2>
            <img className=" fa-beat-fade"  src={Logout_Moving_Cart} alt="" />
        </div>
    )
}

export default Signout;