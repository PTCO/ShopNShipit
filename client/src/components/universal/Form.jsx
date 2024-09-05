import {useContext, useEffect, useState } from "react";
import Input from "./Input";
import Oauth from "./Oauth";
import UserContext from "../../context/userContext";

/*                        */
/* DO NOT CHANGE ANYTHING */
/*                        */

/* 
  Prop Values Format for Custom Form:
  - inputs: "[object]" example > inputs={ [{type: text, name: 'username', id: 'userID', label: 'title'}] }
  - buttons: "[object]" example > buttons={ [{type: "submit", text:"Signup"}] } 
  - method: "object" example > method={actions.userSignUp}
  - legend: "string" example > legend={"Sign Up"} 
  - oauth: "[object]" example > oauth={[{type: "Google",  icon:"google-plus", color: "red"}, {type: "Twitter", icon: "twitter", color: 'lightblue'}]}
*/

const Form = ({ legend, inputs, buttons, method, oauth, type}) => {
    const { errorMsg } = useContext(UserContext);
    const [data, setData ] = useState({});
    const [ errors, setErrors] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        inputs.map( input =>  data[input.name] = document.getElementById(input.id).value);
        data["type"] = document.getElementById("type") ? document.getElementById("type").value:false;
        method(data);
    }

    useEffect(()=>{
        setErrors(errorMsg.messages)
    }, [errorMsg])

    return (
        <>
        <form onSubmit={e => handleSubmit(e)} className={`d-flex ${type === "payment" ? "flex-wrap":"flex-column"} align-items-center text-center w-100`}>
            <legend className="border-bottom border-2 pb-1 fa-shake" style={{animationIterationCount: 1, animationDuration: ".75s"}}>{legend}</legend>
            {inputs.map( (input, index) => { return (
                <Input key={index} input={input} formType={type} />
            ) 
            })}
            <span className="d-flex align-items-center justify-content-start w-100 formButtonContainer">
            {buttons.map( btn => {return (<button key={btn.text} type={btn.type} className="btn btn-dark py-1 mt-2 mb-0 mx-1 w-50" onClick={ e => btn.method ? btn.method():null} style={{background: btn.color, borderColor: btn.color}}> {btn.text} </button>)})}
            </span>
            <span className={`${oauth ? "d-flex":"d-none"} align-items-center mt-2 me-auto oauthContainer`}>
                <h5 className="me-2">Or  <b className="border border-2 rounded px-1" style={{color: "#4d5c46"}}>Login</b> With</h5>
            {oauth && oauth.map( (auth, index) => <Oauth key={index} type={auth.type} icon={auth.icon} color={auth.color} />)}
            </span>
            {errors ? 
            errors.map( (error, index) => <p key={index} className={`d-flex ${type === "payment" ? "mx-auto":null} align-items-center mt-2 fw-bold`}>{error} <i className={`fa-solid ${errorMsg.type === "success" ? "fa-circle-check text-success":"fa-circle-exclamation text-danger"} fa-beat fa-lg ms-1 `}></i></p>)
            :
            null
            }
        </form>
        </>
    );
}

export default Form;