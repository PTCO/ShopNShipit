import { useContext, useEffect, useState } from "react";
import SearchContext from "../../../../../context/searchContext";
import Images from "./Images";
import Info from "./Info";
import InfoReviews from "./InfoReviews";

const Details = () => {
    const { product, searchActions } = useContext(SearchContext);

    useEffect(()=>{
        searchActions.productDetails()
    }, [])

    if(product){
        return (
            <div className="productDetails">
                <Images product={product}/>
                <Info product={product}/>
                <div className="mt-4 desktopProductReviews">
                    <InfoReviews product={product} />
                </div>
            </div>
        )
    }
}

export default Details;