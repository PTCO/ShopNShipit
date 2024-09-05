import { useContext, useState } from "react";
import Review from "./reviews/Review";
import UserContext from "../../../../../context/userContext";

const InfoReviews = ({product}) => {
    const { actions } = useContext(UserContext);
    const [ reviewCount , setReviewCount ] = useState(0);

    const changeReview = () => {
        if(reviewCount === product.Reviews.length - 1) return setReviewCount(0)
        setReviewCount(pre => pre + 1)
    }

    return (
        <div className="w-100 mt-1">
            <span className="d-flex align-items-center">
                <h6>Reviews</h6>
                <h6 className="ms-2 px-2 border border-1 text-white rounded" style={{backgroundColor: "#4d5c46"}}>{product.Reviews.length}</h6>
                <p className={` fs-5 ms-2 border-start ps-2 fw-bold border-2 text-black`} style={{fontFamily: "copal-std-outline", cursor: "pointer"}} onClick={ e => actions.navigate('/Home/Product/Reviews')} >{product.Reviews.length > 0 ? "See More":<button type="submit" className="btn btn-dark p-1" onClick={ e => actions.navigate('/Home/Product/Reviews')} style={{fontFamily: "sans-serif"}}>Add One</button>}</p>
            </span>
            { product.Reviews.length !== 0 ?
            <>
                <div className='d-flex align-items-center infoReviewsCarousel'>
                    <button type="submit" className="btn btn-dark px-2 py-1 mb-0 me-2" onClick={ e => changeReview()}><i className="fa-solid fa-chevron-left fa-lg"></i></button>
                    <Review review={product.Reviews[reviewCount]} />
                </div>
                <div className='d-flex flex-wrap align-items-center infoReviewsRows'>
                    {product.Reviews.map( (review, index) => {
                            return <div><Review review={review} /></div> 
                    })}
                </div>
            </>
            :
            <h6 className="border-right border-2 text-black fs-4 text-center my-4" style={{fontFamily: "copal-std-outline"}}>No reviews</h6>
            }
        </div> 
    )
}

export default InfoReviews;