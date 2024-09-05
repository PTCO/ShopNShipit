import { act, useContext, useEffect, useState } from "react";
import Review from "./reviews/Review";
import UserContext from "../../../../../context/userContext";
import CartContext from '../../../../../context/cartContext';
import InfoReviews from "./InfoReviews";

const Info = ({product}) => {
    const { actions } = useContext(UserContext)
    const { cartActions } = useContext(CartContext);
    const [tags, setTags ] = useState([1, 2, 3, 4, 5]);

    return (
        <div className="mt-1 info">
            <div id="productDescription">
                <h6 className="mt-2" id="productTitle">{product.Title}</h6>
                <p className="productDescription fs-6 overflow-y-auto"><b className="text-white px-2 rounded" style={{background: "#4d5c46"}}>About</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, natus illo enim doloremque ex obcaecati nulla eum, mollitia autem fugiat voluptatibus. Beatae laboriosam, harum repellat assumenda consequuntur est sequi! Dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, enim suscipit tenetur asperiores quasi aspernatur ullam doloribus, repellendus accusantium quidem ad temporibus. Dolores ex optio excepturi, repellendus alias tenetur vero!</p>
            </div>
            <div className="d-flex align-items-center w-100">
                <div className="mb-auto">
                    <span className="d-flex align-items-center mb-1 ratingsContainer">
                        <h6>Rating</h6> 
                        <h6 className="ms-2 px-2 border border-1 text-white rounded" style={{backgroundColor: "#4d5c46"}}>{product.Rating}</h6>
                    </span>
                    {tags.map( tag => { 
                        return (<i key={tag} className={`fa-solid fa-tag fa-lg mx-1 ${product.Rating === tag ? "rating":null}`}></i>)
                    })}
                </div>
                <div className="d-flex align-items-center ms-auto">
                    <h4 id="stockMessage" className="me-2 fs-3 py-1 pe-2 border-end border-2  text-center" ><b style={{color: product.Stock === 0 ? "red":"#4d5c46"}}>{product.Stock === 0 ? "Out of":"In"}</b> Stock</h4>
                    <div>
                        <p className="fs-5 fw-bold mb-1" id="productDetailsPrice"><b className="text-white fw-medium p-1 rounded" style={{background: "#4d5c46"}}>$</b> {product.Price}</p>
                        <button className={`btn btn-dark p-1 w-100 ${product.Stock === 0 ? "d-none":null}`} onClick={ e => cartActions.addToCart(product.Product_ID, product.Portrait, product.Title)}>Add to cart</button>
                    </div>
                </div>
            </div> 
            <div className="mobileProductReviews">
                <InfoReviews product={product} />
            </div>
        </div>
    )
}
export default Info;