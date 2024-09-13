import { useContext, useEffect } from "react";
import UserContext from "../../../../context/userContext";
import BackBtn from "../../../universal/BackBtn";
import Option from "./Option";
import SettingsContext from "../../../../context/settingsContext";

const Payment = ({show}) => {
    const { actions , user } = useContext(UserContext);
    const { isCheckout } = useContext(SettingsContext);

    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
    }, [])

    if(!isCheckout){
        return (
            <>
            <h2 className="border-bottom border-2 pb-1 my-2 settingsTitle" >Payment Options</h2>
            <div className="mb-2">
                <ul className="d-flex flex-column paymentList  overflow-y-auto">    
                    {user.Payments ? user.Payments.map( (option, index) => {
                        return (<Option key={option.Payment_ID} current={option.Current} type={option.Type} expiration={option.Expiration} last4={option.Last4} id={option.Payment_ID}/>)
                    }):null}
                </ul>
                <li style={{order: "1"}} className={`d-flex align-items-center p-2 border border-2 mt-2 rounded fw-bold`} onClick={ e => actions.navigate('/Home/Settings/Payments/Add')}><i className="fa-solid fa-square-plus fa-2x me-2"></i> Add Payment Option</li>
            </div>
            <div className="mt-auto border-top border-2 pt-2">
                <BackBtn text={"Settings"} path={"/Home/Settings"}/>
            </div>
            </>
        )
    }
    return (
        <>
            <div className="d-flex flex-column col-8">
                <ul className="d-flex flex-column checkoutPaymentList  overflow-y-auto">    
                    <li className={`${user.Payments.length === 0 ? 'd-flex':'d-none'} flex-column p-3 border border-2 rounded fw-bold mb-2 text-center`} >
                        <h3 className="border-bottom border-2 fs-6 pb-1 mb-2 settingsTitle" >Add Payment Options</h3>
                        <p className={` rounded px-1 fs-6 fw-bold text-white desktopAddMessage`} style={{background: "#bd7c71"}}>User form on the right</p>
                        <p className={` rounded px-1 fs-6 fw-bold text-white mobileAddMessage`} style={{background: "#bd7c71"}}>Use add new address option below</p>
                    </li>  
                    {user.Payments ? user.Payments.map( (option, index) => {
                        return (<Option key={option.Payment_ID} current={option.Current} type={option.Type} expiration={option.Expiration} last4={option.Last4} id={option.Payment_ID}/>)
                    }):null}
                </ul>
                <li className="d-flex align-items-center border border-2 p-1 mt-2 rounded fw-bold addPaymentOptionBtn" onClick={ e => actions.navigate('/Home/Settings/Payments/Add', {state: "checkout"})} style={{order: "1"}}>
                    <i class="fa-solid fa-circle-plus fa-xl me-2 "></i> Add Payment Option
                </li>
                <span className="d-flex w-100" style={{order: "2"}}>
                    <button className="mt-2 p-1 w-25 ms-auto btn btn-dark" style={{background: "#4d5c46"}} onClick={ e => show("delivery")}>Delivery</button>
                </span>
            </div>
        </>
    )
}

export default Payment;