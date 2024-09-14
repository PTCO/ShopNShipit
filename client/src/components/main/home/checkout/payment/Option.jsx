import { useContext, useState } from "react";
import SettingsContext from "../../../../../context/settingsContext";

const Option = ({type, last4, expiration, id, current}) => {
    const { settingsActions } = useContext(SettingsContext);
    const [edit, setEdit ] = useState(false);
    const [consent, setConsent  ] = useState(false);

    return (
        <div className="paymentOption mb-2"  style={{order: `${current ? "0":"1"}`}}>
            <li className={`d-flex flex-column p-2 border border-2 rounded fw-bold mb-2 ${current ? 'fa-bounce':null}`} >
                <span className={`d-flex align-items-center`} onClick={ e => settingsActions.makeCurrentPayment(id)}>
                    <i style={{color: "#4d5c46"}} class={`fa-${current ? 'solid':'regular'} fa-square${current ? '-check':""} fa-2x mb-1`}></i>
                    <p className={`${current ? null:"opacity-0"} rounded px-1 fs-6 fw-bold bg-dark text-white ms-2`}>Current</p>
                </span>
                <span className="d-flex align-items-center">
                    <i className={`fa-brands fa-cc-${type} fa-2x`}></i>
                    <p className="ms-2 px-1 rounded text-white fs-6" style={{background: "#bd7c71"}}>Ending {last4}</p>
                    <p className="ms-2 px-1 rounded text-white fs-6" style={{background: "#4d5c46"}}>Exp {expiration}</p>
                    <button className={`btn ${edit ? "text-white":"text-black"} border border-2 px-2 p-1 rounded ms-auto`} onClick={ e => setEdit(true)} style={{background: edit ? "#4d5c46":null}}> 
                        <i className="fa-solid fa-pen ms-auto"></i>
                    </button>
                </span>
            </li>  
            <span className={`${edit && !consent ? "d-flex":"d-none"} align-items-center`}>
                <button className="btn btn-danger p-1 me-1 " onClick={ e => setConsent(true)}>Delete</button>
                <button className="btn btn-dark p-1 " onClick={ e => setEdit(false)}>Cancel</button>
            </span>
            <div className={`${consent ? null:"d-none"}`}>
                <p className="fs-6 fw-bold">Are you sure you would like to delete this payment option?</p>
                <span className={`d-flex" align-items-center mt-2`}>
                    <button className="btn btn-danger p-1 px-4 me-1 " onClick={ e => settingsActions.deletePayment(id)}><i className="fa-regular fa-trash-can"></i> Yes</button>
                    <button className="btn btn-dark p-1  px-4 " onClick={ e => {setEdit(false); setConsent(false)}}>No</button>
                </span>
            </div>
        </div>

    )
}

export default Option;