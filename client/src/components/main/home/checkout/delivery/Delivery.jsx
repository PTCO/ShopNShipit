import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../context/userContext";
import axios from "axios";
import Option from "./Option";

const Delivery = ({show}) => {
    const [options, setOptions] = useState([]);
    const {user, actions } = useContext(UserContext);

    useEffect(()=>{
        (async()=>{
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Delivery/Options`)
            .then(result => setOptions(result.data))
            .catch(error => actions.handleError(error.response))
        })()
    }, [])

    return (
        <div id="shippingOptions" className="d-flex flex-column row">
            {options.map( option => {
                return <Option key={option.Option_ID} option={option}/>
            })}
            <span className="d-flex w-100 mobileCheckoutNav" style={{order: "2"}}>
                <button className="mt-2 w-25 p-1 me-auto btn btn-dark"  onClick={ e => show("delivery")}>Back</button>
                <button className="mt-2 w-25 p-1 ms-auto btn btn-dark" style={{background: "#4d5c46"}}  onClick={ e => show("review")}>Review</button>
            </span>
        </div>
    )
}

export default Delivery;