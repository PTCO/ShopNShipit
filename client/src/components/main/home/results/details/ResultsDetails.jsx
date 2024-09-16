import { useContext, useEffect } from "react";
import SearchContext from "../../../../../context/searchContext";
import UserContext from "../../../../../context/userContext";
import CartContext from "../../../../../context/cartContext";

const ResultsDetails = () => {
    const { actions } = useContext(UserContext);
    const { results , resultsType } = useContext(SearchContext);
    const { cart , cartActions } = useContext(CartContext);

    useEffect(()=> {
        cartActions.getCart();
    }, [])

    return (
        <span className="w-100 pt-1 mt-2 mb-2  resultsDetails">
            <ul className="d-flex border-top border-2 pt-2 align-items-center justify-content-between resultsNav">
                <li className={`${resultsType === "featured" ? "d-flex":"d-none"} mt-1`}><h5 style={{fontFamily: "copal-std-outline, sans-serif"}}><b style={{fontFamily: "copal-std-solid, sans-serif", color: "#4d5c46"}}>Fea</b>tu<b style={{fontFamily: "copal-std-solid, sans-serif", color: "#bd7c71"}}>red</b></h5></li>
                <li className={`${resultsType === "query" ? "d-flex":"d-none"} mt-1`}><h5 style={{fontFamily: "copal-std-outline, sans-serif"}}><b style={{fontFamily: "copal-std-solid, sans-serif", color: "#4d5c46"}}>Re</b>su<b style={{fontFamily: "copal-std-solid, sans-serif", color: "#bd7c71"}}>lts</b> {results.length}</h5></li>
                <li className="ms-auto me-1"><button className="btn btn-dark py-1" style={{background: "#bd7c71", borderColor: "#bd7c71"}} onClick={ e => actions.navigate('/Home/Settings')}><i class="fa-solid fa-sliders"></i></button></li>
                <li><button className="btn btn-dark py-1" onClick={ e => actions.navigate('/Home/Cart')}><b>{cart.length ?  cart.length:0} Cart</b> <i class="fa-solid fa-cart-shopping"></i></button></li>
            </ul>
        </span>
    )
}

export default ResultsDetails;