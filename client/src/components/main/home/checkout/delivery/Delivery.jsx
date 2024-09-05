import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../context/userContext";
import axios from "axios";
import Option from "./Option";

const Delivery = () => {
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
        <div id="shippingOptions" className="d-flex flex-column col-8">
            {options.map( option => {
                return <Option key={option.Option_ID} option={option}/>
            })}
        </div>
    )
}

export default Delivery;