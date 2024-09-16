import { useContext, useState } from "react";
import SettingsContext from "../../../../../context/settingsContext";

const Address = ({id, addressone, addresstwo, city, state, zip, current}) => {
    const { settingsActions } = useContext(SettingsContext);

    const [edit, setEdit ] = useState(false);
    const [consent, setConsent  ] = useState(false);
    
    return (
        <div className="paymentOption mb-2" style={{order: `${current ? "0":"1"}`}}>
            <li className={`d-flex border border-2 p-2 rounded mb-2 ${current ? 'fa-bounce':null}`} >
                <div className="d-flex flex-column align-items-center me-3">
                    <i class={`${current ? 'fa-solid fa-square-check':'fa-regular fa-square'} fa-2x mb-1`} onClick={ e => settingsActions.makeCurrentAddress(id)} style={{color: "#4d5c46"}}></i>
                    <p className={`${current ? null:"opacity-0"} rounded px-1 fs-6 fw-bold text-white`} style={{background: "#bd7c71"}}>Current</p>
                </div>
                <div className="d-flex flex-column w-100">
                    <p className="fs-6 fw-bold">{addressone} {addresstwo}</p>
                    <h6 className="" style={{color: "#4d5c46"}}>{city}</h6>
                    <span className="d-flex align-items-center">
                        <h6 className="me-2" style={{fontFamily: "copal-std-outline"}}>{state}</h6>
                        <h6>{zip}</h6>
                    </span>
                </div>
                <button className={`btn ${consent ? "text-white":"text-black"} border border-2 mt-auto p-1 px-2`} id={"editBtn"} style={{background: consent ? "#4d5c46":null}} onClick={ e => setEdit(true)}>
                    <i class="fa-solid fa-pen"></i>
                </button>
            </li>
            <span className={`${edit && !consent ? "d-flex":"d-none"} align-items-center mb-2`}>
                <button className="btn btn-danger p-1 me-1 " onClick={ e => setConsent(true)}>Delete</button>
                <button className="btn btn-dark p-1 " onClick={ e => setEdit(false)}>Cancel</button>
            </span>
            <div className={`${consent ? null:"d-none"} mb-2`}>
                <p className="fs-6 fw-bold">Are you sure you would like to delete this delivery address?</p>
                <span className={`d-flex" align-items-center mt-2`}>
                    <button className="btn btn-danger p-1 px-4 me-1 " onClick={ e => settingsActions.deleteAddress(id)}><i className="fa-regular fa-trash-can"></i> Yes</button>
                    <button className="btn btn-dark p-1  px-4 " onClick={ e => {setEdit(false); setConsent(false)}}>No</button>
                </span>
            </div>
        </div>
    )
}

export default Address;