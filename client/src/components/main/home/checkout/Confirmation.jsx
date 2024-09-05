import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../../../context/settingsContext";
import { useLocation } from "react-router-dom";
import CartContext from "../../../../context/cartContext";
import UserContext from "../../../../context/userContext";

const Confirmation = () => {
    const { settingsActions , order } = useContext(SettingsContext);
    const { cart , cartActions } = useContext(CartContext);
    const { user, actions } = useContext(UserContext);
    const location = useLocation();
    const [ itemTotal, setItemTotal] = useState(0);
    const [ subtotal, setSubTotal ] = useState(0);
    const [ currentAddress, setCurrentAddress ] = useState({})

    useEffect(()=>{
        settingsActions.getOneOrder(location.pathname.split("/")[4]);
        settingsActions.setIsCheckout(true);
        cartActions.getCart();
        let itemTotal = cart.map( item => item.Quantity);
        let subTotal = cart.map( item => {
            return item.Quantity * item.Product.Price
        });
        setItemTotal(itemTotal.reduce((arr, curr)=> { return arr + curr}, 0));
        setSubTotal(subTotal.reduce((arr, curr)=> { return arr + curr}, 0));

        user.Shippings.map( address => {
        if(address.Current) {
            setCurrentAddress(address);
        }
        })
    }, [])


    if(order){
        return (
            <div className="confirmation">
                <h2 className="border-bottom border-2 pb-1 my-2 mb-2 settingsTitle" >Order Placed</h2>
                <span className="d-flex align-items-center">
                    <p className="fs-5"><b className="rounded fw-bold  text-white px-2 py-1 " style={{background: "#4d5c46"}}>Confirmation #</b> {order.Order_ID}</p>
                </span>
                <span className="d-flex align-items-center mt-1">
                    <h5 style={{fontFamily: "copal-std-outline"}}>Order Status</h5>
                    <p className="fs-5 ms-2 p-1 fw-bold bg-dark rounded text-white">{order.Status}</p>
                </span>
                <div className="d-flex flex-column border-top border-bottom border-2 py-2 mt-2">
                    <h5 style={{fontFamily: "copal-std-outline"}}>Shipping</h5>
                    <div className="d-flex flex-column w-100">
                        <p className="fs-6 fw-bold">{currentAddress.AddressOne} {currentAddress.AddressTwo}</p>
                        <h6 className="" style={{color: "#4d5c46"}}>{currentAddress.City}</h6>
                        <span className="d-flex align-items-center">
                            <h6 className="me-2" style={{fontFamily: "copal-std-outline"}}>{currentAddress.State}</h6>
                            <h6>{currentAddress.ZipCode}</h6>
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-column border-bottom border-2 pb-2 mt-2">
                    <h5 className="mb-2" style={{fontFamily: "copal-std-outline"}}>Delivery Option</h5>
                    <div className="d-flex flex-column w-100">
                        <h5>{order.Delivery.Description}</h5>
                        <span className="d-flex align-items-center">
                            <p className="me-2 text-white mt-1 mb-2 rounded px-1" style={{background: "#bd7c71"}}>{order.Delivery.Window}</p>
                            
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-column  w-100 border-bottom border-2 py-2 orderBreakdown">
                    <h5 style={{fontFamily: "copal-std-outline"}}>Breakdown</h5>
                    <div className="d-flex my-1">
                        <p className="d-flex flex-column  fw-bold">Subtotal <b className="bg-dark  rounded px-1 text-white">$ {order.SubTotal}</b></p>
                        <p className="mx-2 d-flex flex-column mx-3  fw-bold">Shipping <b className="bg-dark  rounded px-1 text-white">$ {user.Delivery.Cost}</b></p>
                        <p className="d-flex flex-column   fw-bold">Tax <b className="bg-dark  rounded px-1 text-white">$ {3.49}</b></p>
                    </div>
                    <sapn className="d-flex align-items-center w-100">
                        <h6 className="d-flex align-items-center">Items <p className="p-1 rounded fw-bold text-white px-2 ms-1" style={{background: "#4d5c46"}}>{order.ItemsCount}</p> </h6>
                        <h6 className="d-flex align-items-center ms-auto">Total <p className="fs-6 fw-bold ms-1 px-1 text-white rounded" style={{background: "#bd7c71"}}>$ {(subtotal + order.ShippingPrice + order.Tax)}</p></h6>
                    </sapn>
                </div>
                <span className="pt-2 d-flex align-items-center">
                    <button className="btn btn-dark me-2" onClick={ e => actions.navigate('/Home')}>Close</button>
                    <button className="btn btn-dark" onClick={ e => actions.navigate(`/Home/Settings/Orders/Details/${order.Order_ID}`)} style={{background: "#4d5c46", borderColor: "#4d5c46"}}>View Order</button>
                </span>
            </div>
        )
    }
}

export default Confirmation;