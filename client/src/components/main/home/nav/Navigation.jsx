import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../../context/userContext";
import ReactDOM from 'react-dom';
import Notification from "../notifications/Notification";
import { useLocation } from "react-router-dom";
import SearchContext from "../../../../context/searchContext";
import Cookie from "js-cookie";

const Navigation = () => {
    const { actions , user, OauthCookie, authCookie } = useContext(UserContext);
    const { searchActions } = useContext(SearchContext);
    const location = useLocation();
    const [query, setQuery] = useState(Cookie.get('query') !== undefined? Cookie.get('query'):"");
    
    const [ toggleFilter, setToggleFilter] = useState(location.pathname !== "/Home/Filters" ? false:true);
    
    useEffect(()=>{
        setTimeout(() => {
            if(OauthCookie || authCookie) {
                searchActions.productSearch(query);
            }
        }, 1000);
    }, [location.pathname])

    return (
        <>
        {ReactDOM.createPortal(
            <Notification />,
            document.getElementById("portal")
        )}
        <nav className="w-100 searchNav">
            <ul className="d-flex align-items-center">
                <li onClick={ e => {setToggleFilter(pre => !pre); !toggleFilter ? actions.navigate('/Home/Filters'):actions.navigate('/Home')}} className="p-1 border border-2 rounded me-1 filterButton" style={{background: toggleFilter ? "#4d5c46":"", color: toggleFilter ? "white":""}}><i className="fa-solid fa-filter fa-lg"></i></li>
                <li className="d-flex align-items-center w-100"><input onChange={e => { if(!e.target.value.includes("/")) {setQuery(e.target.value);  searchActions.productSearch(e.target.value)}}} style={{borderRadius: ".375rem 0 0 .375rem"}} className="form-control searchField" type="text" value={query} name="" id="" /><button type="submit" className="btn" style={{borderRadius: "0 .375rem .375rem 0"}} onClick={ e => {actions.navigate('/Home'); searchActions.productSearch(query)}}><i  className="fa-solid fa-magnifying-glass text-white"></i></button></li>
            </ul>
            <p className={`${user.Filter.PriceStatus || user.Filter.RatingStatus ? null:"d-none"} fs-5`}>Filters <b className="px-1 rounded text-white" style={{backgroundColor: "#4d5c46"}}>Active</b></p>
        </nav>
        </>
    )
}

export default Navigation;