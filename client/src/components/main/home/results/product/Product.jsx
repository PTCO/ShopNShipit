import { useContext, useState } from 'react';
import UserContext from '../../../../../context/userContext';
import CartContext from '../../../../../context/cartContext';

const Product = ({title, highlight, price, img, id, rating, reviews, stock}) => {
    const { actions } = useContext(UserContext);
    const { cartActions } = useContext(CartContext);
    const [tags, setTags ] = useState([1, 2, 3, 4, 5]);

    return (
        <div className='searchProduct'>
            <div className="d-flex align-items-center mb-1 px-2 p-1 border border-2 rounded w-100 product" onClick={ e => actions.navigate(`Home/Product`, {state: id})}>
                <img className='productImg' src={img} alt="" />
                <div className='d-flex flex-column h-100 w-100 ms-2'>
                    <p id="productTitle" className='fs-5 text-black fw-bold'>{title}</p>
                    <span className='d-flex align-items-center mt-auto mb-1'>
                        <p id="productHighlight" className='fs-6 border border-1 px-1 rounded text-white ' style={{backgroundColor: "#4d5c46"}}>{highlight}</p>
                        <b className='fs-5 fw-bold ms-auto  rounded text-center productPrice'>${price}</b>
                    </span>
                </div>
            </div>
            <span id="productNav" className='d-flex align-items-center w-100 mb-2'>
                <span className='d-flex align-items mb-1'>
                    {tags.map( tag => { 
                        return (<i key={tag} className={`fa-solid fa-tag fa-xl mx-1 ${rating === tag ? "rating":null}`}></i>)
                    })}
                </span>
                <p className='ms-1 mb-1 p-1 px-2 text-white rounded fw-bold' style={{background: "#4d5c46"}}>{reviews.length}</p>
                {stock > 0 ?             
                <button type='submit' className='btn btn-dark ms-auto px-2 py-1 fs-6' onClick={ e => cartActions.addToCart(id, img, title)}>Add <i class="fa-solid fa-cart-plus"></i> </button>
                :
                <h4 id="stockMessage" className="me-2 fs-3 py-1 ms-auto text-center" ><b style={{color:"red"}}>Out of</b> Stock</h4>
                }
            </span>
        </div>
    )
}

export default Product;