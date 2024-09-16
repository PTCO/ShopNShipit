import { useContext, useEffect } from "react";
import UserContext from "../../../../../context/userContext";
import Address from "./Address";

const Shipping = ({show}) => {
    const { actions, user } = useContext(UserContext);

    useEffect(()=>{
        actions.setErrorMsg({message: [], type: ""})
    }, [])

    return (
        <>
        <div className="d-flex flex-column col-8">
            <ul className="d-flex flex-column checkoutPaymentList pt-2 overflow-y-auto">
                <li className={`${user.Shippings.length == 0 ? 'd-flex':'d-none'} flex-column p-3 border border-2 rounded fw-bold mb-2 text-center`} >
                    <h3 className="border-bottom border-2 pb-1 mb-2 fs-6 settingsTitle" >Add Address Options</h3>
                    <p className={` rounded px-1 fs-6 fw-bold text-white desktopAddMessage`} style={{background: "#bd7c71"}}>User form on the right</p>
                    <p className={` rounded px-1 fs-6 fw-bold text-white mobileAddMessage`} style={{background: "#bd7c71"}}>Use add new address option below</p>
                </li> 
                {user.Shippings.map( address => {
                    return <Address key={address.Address_ID} id={address.Address_ID} addressone={address.AddressOne} addresstwo={address.AddressTwo} city={address.City} state={address.State} zip={address.ZipCode} current={address.Current}/>
                })}
            </ul>
            <li className="d-flex align-items-center border border-2 p-1 mt-2 rounded fw-bold addShippingAddressBtn" onClick={ e => actions.navigate('/Home/Settings/Shipping/Add', {state: "checkout"})} style={{order: "1"}}>
                <i class="fa-solid fa-circle-plus fa-xl me-2 "></i> Add New Address
            </li>
            <span className="d-flex w-100 mobileCheckoutNav" style={{order: "2"}}>
                <button className="mt-2 p-1 w-25 me-auto btn btn-dark"  onClick={ e => show("payments")}>Back</button>
                <button className="mt-2 p-1 w-25 ms-auto btn btn-dark" style={{background: "#4d5c46"}} onClick={ e => show("showShippingOption")}>Shipping</button>
            </span>
        </div>
        </>
    ) 
}

export default Shipping;