import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SettingsContext from "../../../../context/settingsContext";
import CartContext from "../../../../context/cartContext";
import BackBtn from "../../../universal/BackBtn";

const OrderDetails = () => {
    const { cartActions } = useContext(CartContext);
    const { order, settingsActions } = useContext(SettingsContext);
    const [items, setItems ] = useState(true);
    const location = useLocation();

    useEffect(()=>{
        settingsActions.getOneOrder(location.pathname.split("/")[5]);
    }, [])

    if(order) {
        return (
            <>
            <h2 className="border-bottom border-2 pb-1 mt-2 mb-1 settingsTitle" >{`Order Details`}</h2>
            <div className="mb-2">
                {items ? 
                <div className="d-flex flex-column orderItemsList overflow-y-auto">
                    {order.Cart.map( product => {
                        return (
                            <div key={product.Product_ID} className="d-flex align-items-cemter mb-2 border border-2 rounded px-1 py-2 orderProduct">
                                <img className="orderProductPortrait me-2" src={product.Portrait[0]} alt="" />
                                <div className="d-flex flex-column w-100">
                                    <h6 className="overflow-y-auto mb-1">{product.Title}</h6>
                                    <span className="d-flex align-items-center mt-auto">
                                        <button className="btn btn-dark py-0 px-1" onClick={ e => cartActions.addToCart(product.Product_ID, product.Portrait[0], product.Title)}>Buy again</button>
                                        <h6 className="d-flex align-items-center ms-auto" style={{fontFamily: "copal-std-outline"}}>Price <p className="fs-6 fw-bold ms-1 px-1 text-white rounded" style={{background: "#bd7c71"}}>$ {product.Price}</p></h6>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div id="orderDetails" className="d-flex flex-column overflow-y-none">
                    <div className="d-flex flex-column ">
                        <h5 style={{fontFamily: "copal-std-outline"}}>Shipping</h5>
                        <div className="d-flex flex-column mb-1 w-100">
                            <p className="fs-6 fw-bold">{order.Shipping.AddressOne} {order.Shipping.AddressTwo}</p>
                            <h6 className="" style={{color: "#4d5c46"}}>{order.Shipping.City}</h6>
                            <span className="d-flex align-items-center">
                                <h6 className="me-2" style={{fontFamily: "copal-std-outline"}}>{order.Shipping.State}</h6>
                                <h6>{order.Shipping.ZipCode}</h6>
                            </span>
                        </div>
                    </div>
                    <div className="d-flex flex-column border-top border-2">
                        <h5 className="mt-1" style={{fontFamily: "copal-std-outline"}}>Delivery Option</h5>
                        <div className="d-flex flex-column w-100">
                            <h5>{order.Delivery.Description}</h5>
                            <span className="d-flex align-items-center">
                                <p className="me-2 text-white mt-1 mb-2 rounded px-1" style={{background: "#bd7c71"}}>{order.Delivery.Window}</p>
                                
                            </span>
                        </div>
                    </div>
                    <div className="d-flex flex-column border-top border-2">
                        <h5 className="mt-1" style={{fontFamily: "copal-std-outline"}}>Payment Option</h5>
                        <div className="d-flex align-items-center mb-1 w-100">
                            <i id="orderDetailCardIcon" class="fa-brands fa-cc-mastercard fa-2x"></i>
                            <p className="mx-2 text-white  fw-bold rounded px-1" style={{background: "#4d5c46"}}>{order.Payment.Last4}</p>
                            <p className="me-2 text-white fw-bold  rounded px-1" style={{background: "#bd7c71"}}>{order.Payment.Expiration}</p>
                        </div>
                    </div>
                </div>
                }
                <span className="d-flex flex-column  w-100 border-top border-2 pt-2 mt-auto orderBreakdown">
                    <span className="d-flex align-items-center mb-1">
                        <button className="btn btn-dark" onClick={ e => setItems(true)}>Items</button>
                        <button type="submit" className="btn btn-dark ms-2" onClick={ e => setItems(false)}>Details</button>
                    </span>
                    <h6 style={{fontFamily: "copal-std-outline"}}>Breakdown</h6>
                    <div className="d-flex my-1">
                        <p className="d-flex flex-column  align-items-center fw-bold">Subtotal <b className="bg-dark  rounded px-1 text-white">$ {order.SubTotal}</b></p>
                        <p className="mx-2 d-flex flex-column  align-items-center fw-bold">Shipping <b className="bg-dark  rounded px-1 text-white">$ {order.ShippingPrice}</b></p>
                        <p className="d-flex flex-column  align-items-center fw-bold">Tax <b className="bg-dark  rounded px-1 text-white">$ {order.Tax}</b></p>
                        <p className="mt-auto ms-auto p-1 fw-bold bg-dark rounded text-white">{order.Status}</p>
                    </div>
                    <sapn className="d-flex align-items-center w-100">
                        <h6 className="d-flex align-items-center">Items <p className="p-1 rounded fw-bold text-white px-2 ms-1" style={{background: "#4d5c46"}}>{order.ItemsCount}</p> </h6>
                        <h6 className="d-flex align-items-center ms-auto">Total 
                            <p className="fs-6 fw-bold ms-1 px-1 text-white rounded" style={{background: "#bd7c71"}}>
                            $ {order.SubTotal + order.ShippingPrice + order.Tax}
                            </p>
                        </h6>
                    </sapn>
                </span>
            </div>
            <BackBtn text={"Orders"} path={"/Home/Settings/Orders"}/>
            </>
        )
    }
}

export default OrderDetails;