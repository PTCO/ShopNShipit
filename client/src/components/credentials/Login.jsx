import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext.js";
import Form from '../universal/Form.jsx'

const Login = () => {
    const { actions , user } = useContext(UserContext);

    useEffect(()=>{
        actions.setErrorMsg([]);
        if(user) actions.navigate('/Home') 
    }, [])

    return (
        <div className="w-100 h-100 d-flex justify-content-center pt-1 px-4">
            <Form 
                legend={"Login"} 
                inputs={[
                    {label: 'Username', type: 'text', name: "Username", id:"Username"},
                    {label: 'Password', type: 'password', name: "Password", id:"Password"},
                ]} 
                buttons={[{type: "submit", text:"Login"}]} method={actions.userLogin}
                oauth={[{type: "Google",  icon:"google-plus", color: "red"}, {type: "Twitter", icon: "twitter", color: 'lightblue'}]}                
            />
        </div>
    );
};
export default Login;