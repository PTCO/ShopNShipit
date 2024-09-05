import { useContext, useEffect } from "react";
import SettingsContext from "../../../../context/settingsContext";
import UserContext from "../../../../context/userContext";

const Order = ({id, itemcount, thumbnail, subtotal, shippingprice, tax, cart, status }) => {
    const { actions } = useContext(UserContext);
    const { settingsActions  } = useContext(SettingsContext);

    // useEffect(()=>{
    //     setTimeout(() => {
    //         settingsActions.updateOrderStatus(id, "Shipped");
    //     }, 5000);
    // })

    return (
        <div className="d-flex flex-column border border-2 p-2 mt-1 mb-2 pe-2 rounded order">
            <span className="d-flex align-items-center">
                <img src={thumbnail} alt="" className="orderPortrait me-1"/>
                <div className="d-flex flex-column w-100 h-100">
                    <button className="btn btn-dark px-1 w-100 mb-2" style={{background: "#4d5c46", borderColor: "#4d5c46"}} onClick={e => {actions.navigate(`/Home/Settings/Orders/Details/${id}`)}}>View Order</button>
                    <button className="btn btn-dark px-1 w-100 mt-1" onClick={ e => settingsActions.deleteOrder(id)}>Delete</button>
                </div>
            </span>
            <div className="d-flex flex-column h-100 w-100">
                <h5 className="my-1 overflow-x-hidden orderTitle">{cart[cart.length - 1].Title.substring(0, 32)} ...</h5>
                <span className="d-flex align-items-center w-100 mt-auto"> 
                    <h6 className="d-flex align-items-center">Items <p className="p-1 rounded fw-bold text-white px-2 ms-1" style={{background: "#4d5c46"}}>{itemcount}</p> </h6>
                    <h6 className="d-flex align-items-center ms-auto">Total <p className="fs-5 fw-bold ms-1 px-1 fs-6 text-white rounded" style={{background: "#bd7c71"}}>$ {subtotal + shippingprice + tax}</p></h6>
                </span>
            </div>
            <span className="d-flex align-items-center mt-1">
                <p className="fs-6 mt-1 p-1 fw-bold bg-dark rounded text-white">{status}</p>
            </span>
        </div>
    )
}

export default Order;