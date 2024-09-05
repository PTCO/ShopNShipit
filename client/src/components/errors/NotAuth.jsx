import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import { useLocation } from "react-router-dom";

const NotAuth = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <h2 className="p-2 mb-2 border-bottom border-2">Login to access this page</h2>
            <button className="btn btn-dark mt-2" onClick={ e => {actions.navigate('/Login', {state: location.state})}}>Login</button>
        </div>
    )
}
 export default NotAuth;