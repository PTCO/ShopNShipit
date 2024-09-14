import { useContext, useEffect, useState } from "react";
import Payment from "./payment/Payment";
import Shipping from "../../settings/shipping/Shipping";
import CartContext from "../../../../context/cartContext";
import Item from "../cart/Item";
import SettingsContext from "../../../../context/settingsContext";
import UserContext from "../../../../context/userContext";
import BackBtn from "../../../universal/BackBtn";
import Delivery from "./delivery/Delivery";
import AddOption from "../../settings/payment/AddOption";
import AddAddress from "../../settings/shipping/AddAddress";

const Checkout = () => {
    const { cart , cartActions, outOfStock } = useContext(CartContext);
    const { user , actions, errorMsg } = useContext(UserContext);
    const { settingsActions } = useContext(SettingsContext);
    const [ itemTotal, setItemTotal] = useState(0);
    const [ subtotal, setSubTotal ] = useState(0);

    const [ showPayments, setShowPayments ] = useState(true);
    const [ showDelivery, setShowDelivery ] = useState(false);
    const [ showReview, setShowReview ] = useState(false);
    const [ showShippingOption, setShowShippingOption ] = useState(false);

    const show = (view) => {
        setShowReview(false);
        setShowPayments(false);
        setShowDelivery(false);
        setShowShippingOption(false);
        if(view === 'payments') {
            setShowPayments(true);
        }
        if(view === 'delivery') {
            setShowDelivery(true);
        }
        if(view === 'review'){
            setShowReview(true);
        }
        if(view === 'showShippingOption'){
            setShowShippingOption(true);
        }
    }

    useEffect(()=>{
        if(cart.length === 0) {
            return actions.navigate('/Home/Cart')
        }
        if(outOfStock && outOfStock.length >= 1) {
            actions.navigate('/Home/Cart')
            document.getElementById("portal").className = "null";
            return
        } 
        settingsActions.setIsCheckout(true);
        cartActions.getCart();
        let itemTotal = cart.map( item => item.Quantity);
        let subTotal = cart.map( item => {
            return item.Quantity * item.Product.Price
        });
        setItemTotal(itemTotal.reduce((arr, curr)=> { return arr + curr}, 0));
        setSubTotal(subTotal.reduce((arr, curr)=> { return arr + curr}, 0));
    }, [])


    return (
        <>
            <div className="checkout">
                <h5 onClick={ e => show("payments")} className="border-bottom border-2 pb-1 mt-2 settingsTitle" >Payments <i class={`fa-${showPayments ? 'solid':'regular'} fa-square-caret-${showPayments ? 'down':'up'} ms-1`}></i></h5>
                <div className={`${showPayments ? null:'d-none'} mt-2 checkoutPayment`}>
                    <Payment show={show}/>
                </div>
                <h5 onClick={ e => show("delivery")} className="border-bottom border-2 pb-1 mt-2  settingsTitle" >Delivery Address <i class={`fa-${showDelivery ? 'solid':'regular'} fa-square-caret-${showDelivery ? 'down':'up'} ms-1`}></i></h5>
                <div className={`${showDelivery ? null:'d-none'} mb-2 checkoutDelivery`}>
                    <Shipping show={show}/>
                </div>
                <h5 onClick={ e => show("showShippingOption")} className="border-bottom border-2 pb-1 mt-2  settingsTitle" >Shipping Option <i class={`fa-${showShippingOption ? 'solid':'regular'} fa-square-caret-${showShippingOption ? 'down':'up'} ms-1`}></i></h5>
                <div className={`${showShippingOption ? null:'d-none'} checkoutShippingOption`}>
                    <Delivery show={show}/>
                </div>
                <h5 onClick={ e => show("review")} className="border-bottom border-2 pb-1 settingsTitle mt-2" >Review & Summary <i class={`fa-${showReview ? 'solid':'regular'} fa-square-caret-${showReview ? 'down':'up'} ms-1`}></i></h5>
                <div className={`${showReview ? 'd-flex':'d-none'} flex-column checkoutSummary`}>
                    <div className="d-flex flex-column itemSummary pt-2">
                        {cart.map( cart => {
                            return (<Item key={cart.Cart_ID} quantity={cart.Quantity} stock={cart.Product.Stock} id={cart.Product.Product_ID} cartid={cart.Cart_ID} title={cart.Product.Title} highlight={cart.Product.Highlight} price={cart.Product.Price} img={cart.Product.Portrait}/>)
                        })}
                    </div>
                    <div className="d-flex flex-column  w-100 border-bottom border-2  pt-2 pb-1 mt-auto orderBreakdown">
                        <h6 style={{fontFamily: "copal-std-outline"}}>Breakdown</h6>
                        <div className="d-flex my-1">
                            <p className="d-flex flex-column  align-items-center fw-bold">Subtotal <b className="bg-dark  rounded px-1 text-white">$ {subtotal}</b></p>
                            <p className="mx-2 d-flex flex-column  align-items-center fw-bold">Shipping <b className="bg-dark  rounded px-1 text-white">$ {user.Delivery ? user.Delivery.Cost:0.00}</b></p>
                            <p className="d-flex flex-column  align-items-center fw-bold">Tax <b className="bg-dark  rounded px-1 text-white">$ {3.49}</b></p>
                        </div>
                        <sapn className="d-flex align-items-center w-100">
                            <h6 className="d-flex align-items-center">Items <p className="p-1 rounded fw-bold text-white px-2 ms-1" style={{background: "#4d5c46"}}>{itemTotal}</p> </h6>
                            <h6 className="d-flex align-items-center ms-auto">Total <p className="fs-6 fw-bold ms-1 px-1 text-white rounded" style={{background: "#bd7c71"}}>$ {subtotal + 7.50 + 3.49}</p></h6>
                        </sapn>
                        <span className="d-flex w-100 mb-2" style={{order: "2"}}>
                            <button className="mt-2 p-1 w-25 me-auto btn btn-dark"  onClick={ e => show("showShippingOption")}>Back</button>
                        </span>
                    </div>
                    <span className="d-flex pt-2 mb-1">
                        <BackBtn text={"Cart"} path={"/Home/Cart"} />
                        <button onClick={ e => cartActions.checkout(user.User_ID, cart[cart.length - 1].Product.Portrait, itemTotal, subtotal, cart, user.Delivery)} className="btn btn-dark ms-auto mb-auto" style={{fontSize: ".95rem"}}>Place Order</button>
                    </span>
                    {errorMsg.messages ? errorMsg.messages.map( (message, index) => {return <p key={index} className={`d-flex ${errorMsg.type === "payment" ? "mx-auto":null} align-items-center fs-6 mt-1 fw-bold mx-auto`}>{message} <i className={`fa-solid ${errorMsg.type === "success" ? "fa-circle-check text-success":"fa-circle-exclamation text-danger"} fa-beat fa-lg ms-1 `}></i></p>}):null}
                    
                </div>
            </div>
            <div id="checkoutDesktop" className="d-flex flex-column 100vh">
                <nav className="d-flex w-100">
                    <ul className="d-flex align-items-center">
                        <li onClick={ e => show("payments")}  className={`checkoutNavOption d-flex align-items-center btn ${showPayments ? "checkOutNavSelected":null}`}><b className=" fs-3 me-2">1</b> <b className="btn btn-dark">Payments</b></li>
                        <li onClick={ e => show("delivery")}  className={`checkoutNavOption d-flex mx-3  btn ${showDelivery ? " checkOutNavSelected ":null}`}><b className=" fs-3 me-2">2</b> <b className="btn btn-dark">Delivery Address</b></li>
                        <li onClick={ e => show("showShippingOption")}  className={`checkoutNavOption d-flex me-3 btn ${showShippingOption ? " checkOutNavSelected ":null}`}><b className=" fs-3 me-2">3</b> <b className="btn btn-dark">Shipping Option</b></li>
                        <li onClick={ e => show("review")} className={`checkoutNavOption d-flex  btn ${showReview ? " checkOutNavSelected ":null}`}><b className=" fs-3 me-2">4</b> <b className="btn btn-dark">Review & Summary</b></li>
                    </ul>
                </nav>
                <div className={`${showPayments ? null:'d-none'} mt-2 checkoutPayment row`}>
                    <Payment />
                    <AddOption />
                </div>
                <div className={`${showDelivery ? null:'d-none'} mt-2 checkoutDelivery row`}>
                    <Shipping />
                    <AddAddress />
                </div>
                <div className={`${showShippingOption ? null:'d-none'} mt-2 checkoutShippingOption row`}>
                    <Delivery />
                </div>
                <div className={`${showReview ? 'd-flex':'d-none'} flex-column checkoutSummary`}>
                    <div className="d-flex flex-column itemSummary pt-2">
                        {cart.map( cart => {
                            return (<Item key={cart.Cart_ID} quantity={cart.Quantity} stock={cart.Product.Stock} id={cart.Product.Product_ID} cartid={cart.Cart_ID} title={cart.Product.Title} highlight={cart.Product.Highlight} price={cart.Product.Price} img={cart.Product.Portrait}/>)
                        })}
                    </div>
                    <div className="d-flex flex-column  w-100 border-bottom border-2  pt-2 pb-1 mt-auto orderBreakdown">
                        <h6 style={{fontFamily: "copal-std-outline"}}>Breakdown</h6>
                        <div className="d-flex my-1">
                            <p className="d-flex flex-column  align-items-center fw-bold">Subtotal <b className="bg-dark  rounded px-1 text-white">$ {subtotal}</b></p>
                            <p className="mx-2 d-flex flex-column  align-items-center fw-bold">Shipping <b className="bg-dark  rounded px-1 text-white">$ {user.Delivery ? user.Delivery.Cost:0.00}</b></p>
                            <p className="d-flex flex-column  align-items-center fw-bold">Tax <b className="bg-dark  rounded px-1 text-white">$ {3.49}</b></p>
                        </div>
                        <sapn className="d-flex align-items-center w-100">
                            <h6 className="d-flex align-items-center">Items <p className="p-1 rounded fw-bold text-white px-2 ms-1" style={{background: "#4d5c46"}}>{itemTotal}</p> </h6>
                            <h6 className="d-flex align-items-center ms-auto">Total <p className="fs-6 fw-bold ms-1 px-1 text-white rounded" style={{background: "#bd7c71"}}>$ {subtotal + 7.50 + 3.49}</p></h6>
                        </sapn>
                    </div>
                    {errorMsg.messages ? errorMsg.messages.map( (message, index) => {return <p key={index} className={`d-flex ${errorMsg.type === "payment" ? "mx-auto":null} align-items-center fs-6 mt-1 fw-bold mx-auto`}>{message} <i className={`fa-solid ${errorMsg.type === "success" ? "fa-circle-check text-success":"fa-circle-exclamation text-danger"} fa-beat fa-lg ms-1 `}></i></p>}):null}
                    
                </div>
                <span className="d-flex mt-2 pt-2 mb-1">
                    <BackBtn text={"Cart"} path={"/Home/Cart"} />
                    <button type="submit" onClick={ e => { cartActions.checkout(user.User_ID, cart[cart.length - 1].Product.Portrait, itemTotal, subtotal, cart, user.Delivery)}} className="btn btn-dark ms-2 mb-auto" style={{fontSize: ".95rem"}}>Place Order</button>
                </span>
            </div>
        </>
    )
}

export default Checkout;