import { act, useContext, useEffect } from "react";
import UserContext from "../../context/userContext.js";
import Form from '../universal/Form.jsx'

const Signup = () => {
    const { actions , user } = useContext(UserContext);

    useEffect(()=>{
        actions.setErrorMsg([]);
        if(user) actions.navigate('/Home') 
    }, [])

    return (
        <div className="w-100 h-100 d-flex justify-content-center pt-1 px-4">
            <Form // See Form component for usage instructions
                legend={"Sign Up"} 
                inputs={[
                    {label: 'Username', type: 'text', name: "Username", id:"Username"},
                    {label: 'Email', type: 'email', name: "Email", id:"Email"},
                    {label: 'Password', type: 'password', name: "Password", id:"Password"},
                    {label: 'Confirm Password', type: 'password', name: "ConfirmPassword", id:"ConfirmPassword"},
                ]} 
                buttons={[{type: "submit", text:"Signup"}]} 
                method={actions.userSignUp}
                oauth={[{type: "Google",  icon:"google-plus", color: "red"}, {type: "Twitter", icon: "twitter", color: 'lightblue'}]}
            />
        </div>
    );
};
export default Signup;