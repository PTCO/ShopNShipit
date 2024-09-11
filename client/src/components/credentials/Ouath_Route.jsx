import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookie from 'js-cookie';
import UserContext from "../../context/userContext";

const Oauth_Route = () => {

    const { actions } = useContext(UserContext);

    const location = useLocation();

    useEffect(()=>{
        const sid = location.pathname.split("/")[1]
        console.log(sid);
        Cookie.set('usc', sid);
        actions.navigate('/Home');
    }, [])
}

export default Oauth_Route;