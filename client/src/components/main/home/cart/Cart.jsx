import { useContext, useEffect, useState } from "react";
import BackBtn from "../../../universal/BackBtn";
import CartContext from "../../../../context/cartContext";
import Item from "./Item";
import UserContext from "../../../../context/userContext";

const Cart = () => {
    const { user , actions } = useContext(UserContext);
    const { cart , change, cartActions } = useContext(CartContext);
    const [ itemTotal, setItemTotal] = useState(0);
    const [ subtotal, setSubTotal ] = useState(0);

    useEffect(()=>{
        cartActions.getCart();
        let itemTotal = cart.map( item => item.Quantity);
        let subTotal = cart.map( item => {
            return item.Quantity * item.Product.Price
        });
        setItemTotal(itemTotal.reduce((arr, curr)=> { return arr + curr}, 0));
        setSubTotal(subTotal.reduce((arr, curr)=> { return arr + curr}, 0));
    }, [change])

    return (
        <div className="d-flex flex-column justify-content-center cart">
            <div className="d-flex align-items-center justify-content-between py-2 mb-2 border-bottom border-2">
                <h1 >Cart</h1>
                <span className="d-flex align-items-center">
                    <h4 className="me-2" style={{fontFamily: "copal-std-outline"}}>Items</h4>
                    <p className="px-2 rounded fs-5 text-white fw-bold" style={{background: "#4d5c46"}}>{itemTotal}</p>
                </span>
            </div>
            <div className="overflow-y-auto itemsContainer">
            {cart.map( cart => {
                return (<Item key={cart.Cart_ID} quantity={cart.Quantity} stock={cart.Product.Stock} id={cart.Product.Product_ID} cartid={cart.Cart_ID} title={cart.Product.Title} highlight={cart.Product.Highlight} price={cart.Product.Price} img={cart.Product.Portrait}/>)
            })}
            </div>
            <span className="d-flex align-items-center ms-auto mt-auto"><h6 className="me-1" style={{color: "#4d5c46"}}>Subtotal</h6> <b className="py-0 px-2 bg-dark text-white rounded">${subtotal}</b></span>
            <div className="d-flex align-items-center justify-content-between pt-2 mt-2 border-top border-2 " style={{borderColor: "#4d5c46"}}>
                <BackBtn text={"Back"} path={"/Home"}/>
                <button type="submit" className={`${cart.length === 0 ? "d-none":null} btn btn-dark mb-1 px-2`} onClick={ e => { cartActions.outOfStockCheck()}}><i class="fa-solid fa-credit-card"></i> Checkout</button>
            </div>
        </div>
    )
}

export default Cart;