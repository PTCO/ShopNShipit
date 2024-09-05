import { useContext, useEffect, useState } from "react";
import SearchContext from "../../../../../../context/searchContext";
import ReviewCreate from "./ReviewCreate";

const Reviews = () => {
    const { product , searchActions } = useContext(SearchContext);
    const [ tags, setTags ] = useState([1,2,3,4,5]);
    const [ createReview, setCreateReview] = useState(false);
    
    useEffect(()=>{
        searchActions.productDetails()
    }, [])

    if(product) {   
        return (
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <img src={`${product.Portrait}`} alt="" srcSet="" className="desktopReviewProductPortrait me-2 border border-2 rounded" />
                    <div className="w-100">
                        <span className="d-flex flex-column  justify-content-between mt-2 mb-1 reviewProductDetails">
                            <span className="d-flex align-items-center">
                                <img src={`${product.Portrait}`} alt="" srcSet="" className="reviewProductPortrait me-2 border border-2 rounded" />
                                <h6 className="align-self-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum necessitatibus.</h6>
                            </span>
                            <span className={`${createReview ?  "d-none":"d-flex"} align-items-center mt-2`}>
                                <h6>Rating</h6> 
                                <h6 className="ms-2  px-2 border border-1 text-white rounded" style={{backgroundColor: "#4d5c46"}}>{product.Rating}</h6>
                                <span className="ms-2 border-start border-2 ps-1 pt-2">
                                    {tags.map( tag => {return (<i key={tag} className={`fa-solid fa-tag fa-lg mx-1 ${product.Rating === tag ? "rating":null}`}></i>)})}
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="border-top border-2 mt-4 desktopReviewsContainer">
                    <ReviewCreate product={product}/>
                </div>
            </div>
        )
    }
}

export default Reviews;