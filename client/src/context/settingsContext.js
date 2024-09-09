import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import { useLocation } from "react-router-dom";

const SettingsContext = createContext();

export const SettingsProvider = (props) => {
    const { actions , user, isDesktop } = useContext(UserContext);
    const [orders, setOrders ] = useState([]);
    const [ order, setOrder ] = useState();
    const [ orderStatus, setOrderStatus ] = useState({status: false, order: {}});
    const [ isCheckout, setIsCheckout] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        if(location.state === "checkout") {
            setIsCheckout(true)
        } else {
            setIsCheckout(false);
        }
    }, [location.pathname])

    const getOrders = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Orders/${user.User_ID}`)
        .then( result => setOrders(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const getOneOrder = async (id) => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Orders/Details/${id}`)
        .then( result => setOrder(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const updateOrderStatus = async (id, status) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Orders/Update`, {Order_ID: id, Status: status})
        .then( result => {
            setOrderStatus({status: true, order: result.data})
            document.getElementById("portal").className = "null"
            actions.accountNotifications("Order Update", "Order #", id, user.Email, status, "09/09/2024", '', '', '', '', '', '', order.Delivery.Window)
        })
        .catch(error => actions.handleError(error.response))
    }

    const deletePayment = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Payments/Delete/${id}/${user.User_ID}`)
        .then( result => actions.setUser(result.data))
        .catch( error => actions.handleError(error.response))
    } 

    const deleteAddress = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Shipping/Delete/${id}/${user.User_ID}`)
        .then( result => actions.setUser(result.data))
        .catch( error => actions.handleError(error.response))
    } 

    const addOption = async (data) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Payments/Add`, {type: data.type, cardnumber: data.cardnumber, expiration: data.expiration, cardholder: data.cardholder, security: data.cvv, User_ID: user.User_ID})
        .then( result => {
            actions.setUser(result.data); 
            actions.setErrorMsg({messages: ['Payment Added'], type: "success"});
            setTimeout(() => {
                if(isCheckout) {
                    if(isDesktop) {
                        actions.setErrorMsg({messages: [], type: ""})
                        return
                    }
                    actions.navigate('/Home/Checkout');
                    return 
                }
                actions.navigate('/Home/Settings/Payments');
            }, 2000);
        })
        .catch( error => actions.handleError(error.response))
    }

    const addAddress = async(data) => {
        data["User_ID"] = user.User_ID;
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Shipping/Add`, data)
        .then( result => {
            actions.setUser(result.data); 
            actions.setErrorMsg({messages: ['Address added'], type: "success"});
            setTimeout(() => {
                if(isCheckout) {
                    if(isDesktop) {
                        actions.setErrorMsg({messages: [], type: ""})
                        return
                    }
                    actions.navigate('/Home/Checkout');
                    return 
                }
                actions.navigate('/Home/Settings/Shipping')
            }, 2000);
        })
        .catch( error => actions.handleError(error.response))
    }

    const makeCurrentAddress = async (id) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Shipping/Update`, {Current: true, Address_ID: id, User_ID: user.User_ID})
        .then( result => actions.setUser(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const makeCurrentPayment = async (id) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Payments/Update`, {Current: true, Payment_ID: id, User_ID: user.User_ID})
        .then( result => actions.setUser(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const deleteOrder = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Orders/${id}/${user.User_ID}`)
        .then( result => setOrders(result.data))
        .catch( error => actions.handleError(error.response))
    }

    return (
        <SettingsContext.Provider value={{
            orders,
            order,
            orderStatus,
            isCheckout,
            settingsActions: {
                getOrders,
                getOneOrder,
                setOrders,
                setOrder,
                deleteOrder,
                deleteAddress,
                addOption,
                deletePayment,
                addAddress,
                makeCurrentAddress,
                makeCurrentPayment,
                updateOrderStatus,
                setIsCheckout
            }
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext;