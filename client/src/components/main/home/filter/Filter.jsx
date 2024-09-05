import { useContext, useState } from "react";
import Price from "./Price";
import Rating from "./Rating";
import SearchContext from "../../../../context/searchContext";

const Filter = () => {
    const { searchActions } = useContext(SearchContext)

    return (
        <ul className="d-flex flex-column pt-2 filters">
            <Price handleFilter={searchActions.handleFilter}/>
            <Rating handleFilter={searchActions.handleFilter}/>
        </ul>
    )
}

export default Filter;