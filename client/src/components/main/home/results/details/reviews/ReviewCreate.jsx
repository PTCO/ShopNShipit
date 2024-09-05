import { useContext, useState } from "react";
import BackBtn from "../../../../../universal/BackBtn";
import UserContext from "../../../../../../context/userContext";
import Review from "./Review";

const ReviewCreate = ({product}) => {
    const [ createReview, setCreateReview] = useState(false);
    const { actions  } = useContext(UserContext);

    return (
        <>
            <div className={`${createReview ? "d-none":"d-flex"} flex-column align-items-center reviewsList overflow-y-auto mb-2 pt-3`}> 
                {product.Reviews.length > 0 ? product.Reviews.map( review => { return (
                    <Review key={review.Review_ID} review={review}/>
                )}): <h5 className="my-4" style={{fontFamily: "copal-std-outline"}}>No Reviews</h5>}
            </div>
            <span className="d-flex align-items-center">
                <BackBtn text={"Product"} path={"/Home/Product"}/>
                <button type="submit" className={`${createReview ? "d-none":null} createReviewBtn btn btn-dark mb-1 ms-auto`} style={{fontSize: ".95rem"}} onClick={ e => actions.navigate('/Home/Product/Reviews/Add')}>Create Review</button>
            </span>
        </>
    )
}

export default ReviewCreate;