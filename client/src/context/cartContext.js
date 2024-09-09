import { createContext, useContext, useState } from "react";
import axios from "axios";
import UserContext from "./userContext";
import SettingsContext from "./settingsContext";
const CartContext = createContext();

export const CartProvider = (props) => {
    const { user , actions } = useContext(UserContext);
    const { settingsActions } = useContext(SettingsContext);
    const [cart, setCart ] = useState([]);
    const [ change, setChange ] = useState(false);
    const [ addedItem , setAddedItem ] = useState(null);
    const [ outOfStock , setOutOfStock ] = useState([]);
    const [ currentAddress, setCurrentAddress ] = useState({})
    
    const outOfStockCheck = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Cart/${user.User_ID}/Stock`)
        .then( result => {
            setOutOfStock(result.data)
            console.log(result.data)
            if(result.data.length > 0) {
                document.getElementById("portal").className = "null"
                return 
            }
            actions.navigate('/Home/Checkout', {state: "checkout"});
        })
        .catch( error => actions.handleError(error.response))
    }

    const getCart = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Cart/${user.User_ID}`)
        .then( result => setCart(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const addToCart = async (id, portrait, title) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Cart/Add`, {Product_ID: id, User_ID: user.User_ID})
        .then( result => {
            if(result.data.message === "OutOfStock") {
                setOutOfStock([result.data.product]);
                document.getElementById("portal").className = "null"
                return;
            }
            setCart(result.data)
            setAddedItem({Portrait: portrait, Title: title});
            document.getElementById("portal").className = "null"
        })
        .catch( error => {actions.handleError(error.response)})
    }

    const checkout = async (User_ID, Thumbnail, ItemsCount, SubTotal, Cart, Delivery) => {
        let currentAddress;
        let currentPayment;
        user.Shippings.map( address => { 
            if(address.Current){
                return currentAddress = address
            }
        })
        user.Payments.map( payment => { 
            if(payment.Current){
                return currentPayment = payment
            }
        })
        if(!currentAddress) {
            actions.setErrorMsg({messages: ["A Delivery address is needed"], type: ""})
            return;
        }
        if(!currentPayment) {
            actions.setErrorMsg({messages: ["A payment option is needed"], type: ""})
            return;
        }
        if(!user.Delivery) {
            actions.setErrorMsg({messages: ["A Shipping option is needed"], type: ""})
            return;
        }
        
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Cart/Checkout`, {Address_ID: currentAddress.Address_ID ,Payment_ID: currentPayment.Payment_ID,  User_ID, Thumbnail, ItemsCount, SubTotal, Cart, Delivery})
        .then( result => {
            settingsActions.setOrders(result.data.orders);
            if(result.data.outOfStock && result.data.outOfStock.length > 0) {
                setOutOfStock(result.data.outOfStock)
                document.getElementById("portal").className = "null"
                return;
            }
            setTimeout(() => {
                const { Order_ID, Status, Delivery, SubTotal , Tax, ShippingPrice, ItemsCount} = result.data.order;

                user.Shippings.map( address => {
                    if(address.Current) {
                        setCurrentAddress(address);
                    }
                })

                actions.navigate(`/Home/Checkout/Confirmation/${Order_ID}`)
                actions.accountNotifications("Confirmation", "Order confirmation #", Order_ID, user.Email, Status, currentAddress.State, currentAddress.City, currentAddress.AddressOne, currentAddress.AddressTwo, currentAddress.ZipCode, Delivery.Description, Delivery.Window, ShippingPrice, SubTotal, Tax,  ItemsCount)
                cart.map( item => {
                    deleteItem(item.Cart_ID)
                })
            }, 2000);
        })
        .catch( error => actions.handleError(error.response))
    }

    const changeQuantity = async (value, cartid) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Cart/Quantity`, {Quantity: parseInt(value), User_ID: user.User_ID, Cart_ID: cartid})
        .then( result => {setCart(result.data); setChange(pre => !pre)})
        .catch( error => actions.handleError())
    } 

    const deleteItem = async (id) => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Cart/Delete/${id}/${user.User_ID}`)
        .then( result => {setCart(result.data); setChange(pre => !pre)})
        .catch( error => actions.handleError(error.response))
    }   
    return (
        <CartContext.Provider value={{
            cart,
            addedItem,
            outOfStock,
            change,
            cartActions: {
                changeQuantity,
                deleteItem,
                setAddedItem,
                setOutOfStock,
                outOfStockCheck,
                addToCart,
                checkout,
                getCart,
            }
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;