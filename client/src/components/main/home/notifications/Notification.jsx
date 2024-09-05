import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/userContext";
import CartContext from "../../../../context/cartContext";
import SettingsContext from "../../../../context/settingsContext";

const Notification = () => {
    const { actions } = useContext(UserContext);
    const { addedItem , outOfStock, cartActions } = useContext(CartContext);
    const { orderStatus } = useContext(SettingsContext);
    const [counter, setCounter ] = useState(0);

    if(addedItem) {
        return (
            <>
                <span id="overlay"></span>
                <div className="d-flex flex-column bg-white justify-content-center border border-2 rounded p-2 w-75 h-50 notification" style={{zIndex: 1}}>
                    <h5 className="d-flex align-items-center" style={{fontFamily: "copal-std-outline"}}>Item added <i className="fa-solid fa-bag-shopping ms-1 mb-1" style={{color: '#bd7c71'}}></i></h5>
                    <img src={addedItem.Portrait} alt="" className="addedCartItemPortrait my-1"/>
                    <h6>{addedItem.Title}</h6>
                    <span className="d-flex align-items-center mt-auto justify-content-between">
                        <button className="btn btn-dark" onClick={ e => {document.getElementById("portal").className = "d-none";  cartActions.setAddedItem(null);}}>Close</button>
                        <button className="btn btn-dark" onClick={ e => {document.getElementById("portal").className = "d-none"; cartActions.setAddedItem(null); actions.navigate('/Home/Cart')}} style={{background: "#4d5c46", borderColor: "#4d5c46"}}>Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    </span>
                </div>
            </>
        )
    }
    if(outOfStock && outOfStock.length > 0) {
        return (
            <>
                <span id="overlay"></span>
                <div className="d-flex flex-column bg-white justify-content-center border border-2 rounded p-2 w-75 h-50 notification" style={{zIndex: 1}}>
                    <h5 className="d-flex align-items-center" style={{fontFamily: "copal-std-outline"}}>Out Of Stock <i className="fa-solid fa-circle-exclamation ms-1" style={{color: '#bd7c71'}}></i></h5>
                    <img src={outOfStock[counter].Portrait} alt="" className="addedCartItemPortrait my-1"/>
                    <h6 className="outOfStockTitle">{outOfStock[counter].Title}</h6>
                    <span className="d-flex align-items-center my-2">
                        <h6>Price</h6>
                        <p className='fs-5 fw-medium w-auto rounded ms-2 text-white px-2 productPrice' style={{background: "#bd7c71"}}>${outOfStock[counter].Price}</p>
                    </span>
                    <span className={`${outOfStock.length === 1 ? 'd-none':'d-flex'} align-items-center mt-auto justify-content-center`}>
                        <button className="btn btn-dark me-1" onClick={ e => {
                            if(counter <= 0) {
                                setCounter(outOfStock.length - 1);
                                return 
                            }
                            setCounter(pre => pre - 1)
                        }}>
                            <i className="fa-solid fa-angle-left p-1"></i>
                        </button>
                        <button className="btn btn-dark ms-1" onClick={ e => {
                            if(counter === outOfStock.length - 1) {
                                setCounter(0);
                                return 
                            }
                            setCounter(pre => pre + 1)
                        }}>
                            <i className="fa-solid fa-angle-right p-1"></i>
                        </button>
                    </span>
                    <span className={`d-flex align-items-center ${outOfStock.length > 1 ? 'mt-3':'mt-auto'} justify-content-between`}>
                        <button className="btn btn-dark ms-auto" onClick={ e => {document.getElementById("portal").className = "d-none";  cartActions.setOutOfStock([]); actions.navigate('/Home/Cart')}}>Close</button>
                    </span>
                </div>
            </>
        )
    }
    if(orderStatus.status) {
        return (
            <>
                <span id="overlay"></span>
                <div className="d-flex flex-column bg-white justify-content-center border border-2 rounded p-2 w-75 h-50 notification" style={{zIndex: 1}}>
                    <h5 className="d-flex align-items-center mb-1" style={{fontFamily: "copal-std-outline"}}>Order Update <i className="fa-solid fa-truck-fast ms-2" style={{color: '#bd7c71'}}></i></h5>
                    <p className="border-bottom border-2 pb-1 mb-1 fs-6"><b className="rounded px-1 text-white" style={{background: "#4d5c46"}}>Order</b> {orderStatus.order.Order_ID}</p>
                    <div className="d-flex align-items-center border-bottom border-2 pb-3">
                        <img src={orderStatus.order.Thumbnail} alt="" className="orderUpdatePortrait my-1"/>
                        <div className="mx-auto">
                            <h6>Item Count</h6>
                            <p className="text-center text-white rounded px-1 fw-bold fs-6 my-1" style={{background: "#bd7c71"}}>{orderStatus.order.ItemsCount}</p>
                            <h6>Total</h6>
                            <p className="text-center text-white rounded px-1 fw-bold fs-6 mt-1" style={{background: "#4d5c46"}}>$ {orderStatus.order.SubTotal + orderStatus.order.ShippingPrice + orderStatus.order.Tax}</p>
                        </div>
                    </div>
                    <span className="d-flex align-items-center mt-2">
                        <h5 style={{fontFamily: "copal-std-outline"}}>Status</h5>
                        <p className={`${orderStatus.order.Status === "Canceled" ? "bg-danger":"bg-dark"} fs-5 text-white  rounded px-1 ms-2`}>{orderStatus.order.Status}</p>
                    </span>
                    <span className="d-flex align-items-center mt-auto justify-content-between">
                        <button className="btn btn-dark" onClick={ e => {document.getElementById("portal").className = "d-none";  cartActions.setAddedItem(null);}}>Close</button>
                        <button className="btn btn-dark" onClick={ e => {document.getElementById("portal").className = "d-none"; cartActions.setAddedItem(null); actions.navigate(`/Home/Settings/Orders/Details/${orderStatus.order.Order_ID}`)}} style={{background: "#4d5c46", borderColor: "#4d5c46"}}>Orders <i class="fa-solid fa-cart-shopping"></i></button>
                    </span>
                </div>
            </>
        )
    } 
}

export default Notification;