import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../context/userContext";

const Option = ({option}) => {
    const {actions, user } = useContext(UserContext);
    const [current, setCurrent] = useState(false);

    useEffect(()=>{
        if(user.Delivery && user.Delivery.Option_ID === option.Option_ID) {
            setCurrent(true)
        } else {
            setCurrent(false);
        }
    }, [user.Delivery])

    return (
        <div id="DeliveryOption" className={`d-flex border border-2 col-4 p-2 mt-2 rounded ${current ? 'fa-bounce':null}`} onClick={ e => actions.selectShippingOption(option.Option_ID)} style={{order: `${current ? "0":"1"}`}}>
            <div className="d-flex flex-column align-items-center me-2">
                <i class={`${current ? 'fa-solid fa-square-check':'fa-regular fa-square'} fa-2x mb-1`} onClick={ e => ""} style={{color: "#4d5c46"}}></i>
                <p className={`${current ? null:"opacity-0"} rounded px-1 fs-6 fw-bold text-white`} style={{background: "#bd7c71"}}>Current</p>
            </div>
            <div className="d-flex flex-column w-100">
                <h5>{option.Description}</h5>
                <p className="fw-bold fs-6">{option.Window}</p>
                <p className="d-flex align-items-center w-100">
                    <b className="bg-dark text-white px-1 rounded">$ {option.Cost}</b>
                    <i className="fa-solid fa-truck-fast fa-xl ms-auto" style={{color: "#4d5c46"}}></i>
                </p>
            </div>
        </div>
    )
}

export default Option;