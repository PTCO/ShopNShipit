import { useState } from 'react';
import ShopNShipitLogo  from '../../../../../../assets/ShopNShipit.png';
import { useLocation } from 'react-router-dom';
const Review = ({review}) => {
    const [tags, setTags ] = useState([1, 2, 3, 4, 5]);

    const location = useLocation();
    
    if(review) {
        return (
            <div className='d-flex flex-wrap'>
                <div className="d-flex flex-wrap align-items-center mt-2 me-auto border border-2 review rounded p-1">
                    <img src={ShopNShipitLogo} className='reviewPortrait me-1 rounded-circle' alt="" />
                    <div className="d-flex flex-column">
                        <h6 className='d-flex w-100'>{review.Username}</h6>
                        <p className='text-wrap mb-2' style={{wordBreak: "break-all"}}><b style={{background: "#4d5c46"}} className=' text-white fw-bold rounded px-2 '>{review.Summary}</b> <b className={`text-wrap fw-medium reviewText`}>{review.Review}</b></p>
                        
                        <span>
                            {tags.map( tag => { 
                                return (<i key={tag} className={`fa-solid fa-tag fa-xl mx-1 ${review.Rating === tag ? "rating":null}`}></i>)
                            })}
                        </span>
                    </div>
                </div>
                <small className='ms-auto rounded text-white mt-1 px-1' style={{background: "#bd7c71"}}>{review.Time}</small>
            </div>
        )
    }
}

export default Review;