import { act, createContext, useContext, useState } from "react";
import axios from 'axios';
import UserContext from "./userContext";
import Cookie from "js-cookie";


const SearchContext = createContext();

export const SearchProvider = (props) => {

    const { user , actions , location , OauthCookie, authCookie} = useContext(UserContext);
    const [ results, setResults] = useState([]);
    const [ resultsType, setResultsType] = useState([]);
    const [product, setProduct] = useState();

    const productSearch = async (query) => {
        Cookie.set('query', query)
        setTimeout(async () => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Search/${OauthCookie ? OauthCookie:authCookie}/${query ? query:"blank"}/${user.Filter.PriceStatus ? user.Filter.PriceLow:false}/${user.Filter.PriceStatus ? user.Filter.PriceHigh:false}/${user.Filter.RatingStatus ?  user.Filter.Rating:false}`)
            .then( result => {setResults(result.data.results); setResultsType(result.data.type)})
            .catch( error => actions.handleError(error.response))
        }, 500);
    }

    const productDetails = async () => {
        if(location.state) Cookie.set('product', location.state)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Search/Product/${authCookie ? authCookie:OauthCookie}/${Cookie.get('product')}`)
        .then( result => setProduct(result.data))
        .catch( error => actions.handleError(error.response))
    }

    const createReview = async (data) => {
        data.Product_ID = product.Product_ID;
        data.Username = user.Username;
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Search/Product/Review`, data)
        .then( result => { 
            setProduct(result.data); 
            actions.setErrorMsg({messages: ["Review added"], type: "success"})
            setTimeout(() => {
                actions.navigate('/Home/Product/Reviews')
            }, 2000);
        })
        .catch( error => actions.handleError(error.response))
    }

    const handleFilter = async (price, rating, status) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Search/Filters/Update/${authCookie ? authCookie:OauthCookie}`, {ID: user.Filter.ID, User_ID: user.User_ID, status, newPriceLow: price.low, newPriceHigh: price.high, newRating: rating})
        .then( result => { actions.setUser(result.data)})
        .catch( error => actions.handleError(error.response))
    }

    return (
        <SearchContext.Provider value={{
            results,
            resultsType,
            product,
            searchActions: {
                handleFilter,
                productSearch,
                productDetails,
                createReview,
            }
        }}>
        {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContext;