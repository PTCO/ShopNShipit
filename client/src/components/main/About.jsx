import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import Cookie from 'js-cookie';

const About = () => {
    const { actions } = useContext(UserContext);

    useEffect(()=>{
        if(!Cookie.get('usc') && !Cookie.get('sid')) actions.navigate('/Login')
    }, [])

    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center pt-1 px-4">
            <button className="btn btn-dark me-2" onClick={ e => actions.navigate('/Home')}>Home</button>
            <p>About Content</p>
        </div>
    )
}

export default About;