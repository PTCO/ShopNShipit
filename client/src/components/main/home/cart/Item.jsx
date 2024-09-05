import { useContext, useEffect, useState } from "react";
import CartContext from "../../../../context/cartContext";
import UserContext from "../../../../context/userContext";
import SettingsContext from "../../../../context/settingsContext";

const Item = ({img, id, cartid, title, price, highlight, quantity, stock}) => {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const { isCheckout } = useContext(SettingsContext);
    const { cartActions } = useContext(CartContext);
    const { actions } = useContext(UserContext);

    useEffect(()=>{
        if(!isNaN(itemQuantity) && itemQuantity === "") {
            return
        }
        cartActions.changeQuantity(itemQuantity, cartid)
        if(itemQuantity > stock || itemQuantity == 0) {
            cartActions.changeQuantity(stock, cartid)
            setItemQuantity(stock)
        }
    }, [itemQuantity])

    if(!isCheckout){
        return (
            <div className="cartItem">
                <div className="d-flex align-items-center mb-1 px-2 p-1 border border-2 rounded w-100 product" onClick={ e => actions.navigate(`Home/Product`, {state: id})}>
                    <img className='productImg' src={img} alt="" />
                    <div className='d-flex flex-column h-100 w-100 ms-2'>
                        <p className='fs-5 text-black fw-bold productTitle'>{title}</p>
                        <span className='d-flex align-items-center mt-auto'>
                            <p className='fs-6 border border-1 px-1 rounded text-white productHighlight' style={{backgroundColor: "#4d5c46"}}>{highlight}</p>
                            <p className='fs-5 fw-medium w-auto rounded ms-auto me-2 text-center fw-bold productPrice'>${price}</p>
                        </span>
                    </div>
                </div>
                <span className="d-flex align-items-center  itemControl mb-3">
                    {stock === 0 ? 
                    <>
                        <h5><b className="text-danger">Out Of</b> Stock</h5>
                        <button className="btn btn-dark px-2 py-1 ms-2" onClick={ e => cartActions.deleteItem(cartid)}>Delete</button>
                    </>
                    :
                    <>
                        <span className="d-flex align-items-center ">
                            <h6 className="me-2 ">Quantity</h6> 
                            <input 
                            className=" form-control  border-2" style={{borderColor: "#bd7c71"}} type="text" value={itemQuantity} name="" id="" 
                            onChange={ e => { if(/^[0-9\b]+$/.test(e.target.value) && e.target.value <= stock || e.target.value === '') setItemQuantity(e.target.value)}}/>
                        </span>
                        <button className="btn btn-dark px-2 py-1 ms-2" onClick={ e => cartActions.deleteItem(cartid)}>Delete</button>
                    </>
                    }
                </span>
            </div>
        )
    } else {
        return (
            <div className="checkoutItem">
                <div className="d-flex align-items-center mb-1 px-2 p-1 border border-2 rounded h-100 w-100" onClick={ e => actions.navigate(`Home/Product`, {state: id})}>
                    <img className='checkoutItemImg' src={img} alt="" />
                    <div className='d-flex flex-column h-100 w-100 ms-2 overflow-x-hidden'>
                        <p className='fs-6 text-black fw-bold productTitle'>{title}</p>
                        <span className='d-flex align-items-center mt-auto mb-1'>
                            <p className='fs-6 border border-1 px-1 rounded text-white productHighlight' style={{backgroundColor: "#4d5c46"}}>{highlight}</p>
                            <p className="ms-auto text-white px-1 rounded" style={{background: "#bd7c71"}}>Quantity <b>{quantity ? quantity:stock}</b></p>
                            <p className='fs-5 fw-bold text-black w-auto rounded ms-2 me-2 text-center productPrice'>${price}</p>
                        </span>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Item;