import { useContext, useEffect } from "react";
import BackBtn from "../../../universal/BackBtn";
import UserContext from "../../../../context/userContext";
import Address from "./Address";
import SettingsContext from "../../../../context/settingsContext";

const Shipping = ({view}) => {
    const { actions, user } = useContext(UserContext);
    const { isCheckout } = useContext(SettingsContext);

    useEffect(()=>{
        actions.setErrorMsg({message: [], type: ""})
    }, [])

    if(!isCheckout){
        return (
            <>
            <h2 className="border-bottom border-2 pb-1 my-2 settingsTitle" >Shipping Address</h2>
            <div className="d-flex flex-column mb-2">
                <ul className="d-flex flex-column addressList overflow-y-auto">
                    {user.Shippings.map( address => {
                        return <Address key={address.Address_ID} id={address.Address_ID} addressone={address.AddressOne} addresstwo={address.AddressTwo} city={address.City} state={address.State} zip={address.ZipCode} current={address.Current}/>
                    })}
                </ul>
                <li className="d-flex align-items-center border border-2 p-2 mt-2 rounded" onClick={ e => actions.navigate('/Home/Settings/Shipping/Add')} style={{order: "1"}}>
                    <i class="fa-solid fa-circle-plus fa-2x me-2"></i>
                    <b className="fs-6">Add New Address</b>
                </li>
            </div>
            <div className="mt-auto border-top border-2 pt-2">
                <BackBtn text={"Settings"} path={"/Home/Settings"}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div className="d-flex flex-column col-8">
                <ul className="d-flex flex-column checkoutPaymentList pt-2 overflow-y-auto">
                    {user.Shippings.map( address => {
                        return <Address key={address.Address_ID} id={address.Address_ID} addressone={address.AddressOne} addresstwo={address.AddressTwo} city={address.City} state={address.State} zip={address.ZipCode} current={address.Current}/>
                    })}
                </ul>
                <li className="d-flex align-items-center border border-2 p-1 mt-2 rounded fw-bold addShippingAddressBtn" onClick={ e => actions.navigate('/Home/Settings/Shipping/Add', {state: "checkout"})} style={{order: "1"}}>
                    <i class="fa-solid fa-circle-plus fa-xl me-2 "></i> Add New Address
                </li>
            </div>
            </>
        )        
    }
}

export default Shipping;