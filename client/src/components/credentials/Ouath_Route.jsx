import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookie from 'js-cookie';
import UserContext from "../../context/userContext";
import axios from "axios";

const Oauth_Route = () => {
    const { actions,  } = useContext(UserContext);
    const location = useLocation();
    const [OauthCookie, setOauthCookie] = useState(null);

    useEffect(()=>{
        const sid = location.pathname.split("/")[3]
        Cookie.set('usc', JSON.stringify(sid));
        setOauthCookie(JSON.stringify(Cookie.get('usc')).substring(3, 35))
        (async()=>{
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/User/${OauthCookie}`)
            .then( result => { actions.setUser(result.data); actions.navigate(location.pathname === '/Login' || location.pathname === '/Signin' ? '/Home':location.pathname) }) // Change navigate route as needed
            .catch( error => actions.handleError(error.response))
        })()
        actions.navigate('/Home');
    }, [])
}

export default Oauth_Route;