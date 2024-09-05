import { useContext, useState } from "react";
import BackBtn from "../../../../universal/BackBtn";
import UserContext from "../../../../../context/userContext";
import InfoReviews from "./InfoReviews";

const Images = ({product}) => {
    const { actions } = useContext(UserContext);
    const [ currentPortrait, setCurrentPortrait ] = useState(0);
    
    return (
        <div id="productImagesCarousel" className="carousel slide mt-2">
            <span className="d-flex align-items-center">
                <BackBtn text={"Results"} path={"/Home"}/>
                <button type="button" className="productCartBtn btn btn-dark mb-1 ms-auto" style={{background: "#4d5c46", borderColor: "#4d5c46"}}  onClick={ e => {actions.navigate('/Home/Cart')}}><i  className="fa-solid fa-cart-shopping text-white me-1"></i> <b >Cart</b></button>
            </span>
            <div className="d-flex" id="productDetailsImages">
                <div className="d-flex justify-content-center productDetailImageContainer">
                    <img src={product.Portrait[currentPortrait]} alt="" className=" productDetailPortrait"/>
                    <div className="d-flex flex-column ms-3 justify-content-equally mobileImageSelection">
                        {
                            product.Portrait.map( (portrait, index) => {
                                return  <div className="d-flex justify-content-center border border-2 rounded" style={{cursor: "pointer"}} onClick={ e => setCurrentPortrait(index)}><img src={portrait} alt="" className=" productDetailPortraitSelect"/></div>
                            })
                        }
                    </div>
                </div>
                <div id="tabletView-productDescription">
                    <h6 id="productTitle" className="my-2">{product.Title}</h6>
                    <p className="productDescription fs-6 overflow-y-auto"><b className="text-white px-2 rounded" style={{background: "#4d5c46"}}>About</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, natus illo enim doloremque ex obcaecati nulla eum, mollitia autem fugiat voluptatibus. Beatae laboriosam, harum repellat assumenda consequuntur est sequi! Dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, enim suscipit tenetur asperiores quasi aspernatur ullam doloribus, repellendus accusantium quidem ad temporibus. Dolores ex optio excepturi, repellendus alias tenetur vero!</p>
                </div>
            </div>
            <div className="d-flex  mt-3 justify-content-equally desktopImageSelection">
                {
                    product.Portrait.map( (portrait, index) => {
                        return  <div className="d-flex justify-content-center border border-2 rounded" style={{cursor: "pointer"}} onClick={ e => setCurrentPortrait(index)}><img src={portrait} alt="" className=" productDetailPortraitSelect"/></div>
                    })
                }
            </div>
                
        </div>
    )
}

export default Images;