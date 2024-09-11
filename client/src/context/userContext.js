import { createContext, useEffect, useState} from 'react'
import Cookie from 'js-cookie'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = (props) => {
    const [authCookie, setAuthCookie] = useState(Cookie.get('usc') ? JSON.stringify(Cookie.get('usc')).substring(3, 35):null); // Standard User session cookie data

    const navigate = useNavigate();
    const [ user, setUser ] = useState(); // User account data
    const location = useLocation();
    const [ isDesktop , setIsDesktop ] = useState(false); 
    const [errorMsg, setErrorMsg ] = useState({messages: [], type: ""}); // Global variable for "User account related" Form error messages data

    const handleError = (error) => { // Handles errors from axios requests
        if(error && error.status === 401) return setErrorMsg({messages: error.data, type: ""});
        if(error && error.status === 404) return navigate('/NotFound'); // Change navigate route as needed
        if(error && error.status === 403) {
            Cookie.remove('usc'); Cookie.remove('sid');
            return navigate('/NotAuth') // Change navigate route as needed
        }
        return navigate('/Error'); // Change navigate route as needed
    }

    const selectShippingOption = async (optionID) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Delivery/Select`, {Option_ID: optionID, User_ID: user.User_ID})
        .then( result => setUser(result.data))
        .catch(error => {handleError(error.response)})
    }

    const accountNotifications = async(type, message, orderid, email,  status, deliverydate, state, city, addressone, addresstwo, zip, deliverydesc, deliverywindow, deliverycost, subtotal, tax, itemcount )=> {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Email`, 
        {
            Notification_Type: type,
            Notification_Message: message,
            Order_ID: orderid,
            Email: email,
            Status: status,
            State: state,
            City: city,
            AddressOne: addressone,
            AddressTwo: addresstwo,
            ZipCode: zip,
            DeliveryDesc: deliverydesc,
            DeliveryWindow: deliverywindow,
            DeliveryDate: deliverydate,
            SubTotal: subtotal,
            DeliveryCost: deliverycost,
            Tax: tax,
            ItemCount: itemcount
        })
        .catch( error => handleError(error.response))
    }

    /* User Signin Method */
    const userSignUp = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Signup`, data) // Data should be an object formated like: {Username: string, Email: string, Password: string, ConfirmedPassword: string}
            .then( result => {setUser(result.data.user); Cookie.set('usc', JSON.stringify(result.data.sess)); navigate('/Home')})
            .catch( error =>{handleError(error.response)})
        } catch (error) {
            handleError(error);
        }
    }

    /* Change portrait */
    const portraitChange = async (portrait) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Change`, {Request: "portrait", User_ID: user.User_ID, Portrait: portrait})
        .then( result => {setUser(result.data); setErrorMsg({messages: ["Portrait change"], type:"success"})})
        .catch( error => console.log(error))
    }

    /* Change password */
    const pwdChange = async(data)=>{
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Change`, {Request: "password", User_ID: user.User_ID, oldPassword: data.oldPassword, newPassword: data.newPassword})
            .then( result => {
                setUser(result.data); 
                setErrorMsg({messages: ['Password changed'], type: "success"});
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            })
            .catch( error => handleError(error.response))
        } catch (error) {
            handleError(error);
        }
    }

    /* Change password */
    const usrnChange = async(data)=>{
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Change`, {Request: "username", User_ID: user.User_ID, oldUsername: data.oldUsername, newUsername: data.newUsername})
            .then( result => {
                setUser(result.data); 
                setErrorMsg({messages: ['Username changed'], type: "success"})
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            })
            .catch( error => handleError(error.response))
        } catch (error) {
            handleError(error);
        }
    }

    /* User Login Method */
    const userLogin = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Login`, data) // Data should be an object formated like: {Username: string, Password: string}
            .then( result => {setUser(result.data.user); Cookie.set('usc', JSON.stringify(result.data.sess));  navigate(location.state ? location.state:'/Home'); Cookie.set('query', "");})
            .catch( error => handleError(error.response))
        } catch (error) {
            handleError(error.response);
        }
    }

    /* Signout Method */
    const signout = async (data) => {
        try {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Signout/${data}`,) // Data should be a users ID - User_ID
            .then(() => {
                Cookie.remove('usc'); Cookie.remove('sid'); Cookie.set('query', ""); setUser(null); setAuthCookie(null);
                navigate('/Login')
            })
            .catch( error => handleError(error.response))
        } catch (error) {
            handleError(error.response);
        }
    }

    const sessionCheck = async (sid) => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/User/${sid}`)
        .then( result => { setUser(result.data); navigate(location.pathname === '/Login' || location.pathname === '/Signin' ? '/Home':location.pathname); }) // Change navigate route as needed
        .catch( error => handleError(error.response))
    }

    /* User Cookie Session Check - returns user to "Signin" page, if session has ended */
    useEffect(()=>{
        setErrorMsg({messages: [], type: ""});
        if(authCookie){
            sessionCheck(authCookie);
        }
    }, [location.pathname !== location.pathname])

    return (
        <UserContext.Provider value={{
            user,
            location,
            errorMsg,
            authCookie,
            isDesktop,
            actions: {
                navigate,
                sessionCheck,
                setAuthCookie,
                handleError,
                userSignUp,
                userLogin,
                setIsDesktop,
                signout,
                pwdChange,
                usrnChange,
                selectShippingOption,
                setUser,
                setErrorMsg,
                portraitChange,
                accountNotifications
            }
        }}>
        {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;