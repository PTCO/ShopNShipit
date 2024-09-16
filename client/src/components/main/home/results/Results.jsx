import { useContext } from "react";
import SearchContext from "../../../../context/searchContext";
import Product from "./product/Product"
import ResultsDetails from "./details/ResultsDetails"

const Results = ( ) => {
    const { results } = useContext(SearchContext);

    return (
        <>
            <ResultsDetails />
            <div className="d-flex flex-column results">
                {results.map( product => (
                    <Product key={product} id={product.Product_ID} stock={product.Stock} reviews={product.Reviews} rating={product.Rating} title={product.Title} highlight={product.Highlight} price={product.Price} img={product.Portrait}/>
                ))}
            </div>
        </>
    )
}

export default Results;