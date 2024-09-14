import { useContext, useEffect } from "react";
import UserContext from "../../../../context/userContext";
import BackBtn from "../../../universal/BackBtn";
import Option from "./Option";

const Payment = () => {
    const { actions , user } = useContext(UserContext);
    useEffect(()=>{
        actions.setErrorMsg({messages: [], type: ""})
    }, [])
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


export default Payment;