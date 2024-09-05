import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/userContext";

const Price = ({handleFilter}) => {
    const { user } = useContext(UserContext);

    const [ togglePrice , setToggle ] = useState(user.Filter.PriceStatus ? user.Filter.PriceStatus:false);
    const [priceLow, setPriceLow] = useState(user.Filter.PriceLow);
    const [priceHigh, setPriceHigh] = useState(user.Filter.PriceHigh);

    useEffect(()=>{
        if(priceLow >= priceHigh && priceHigh > 0) setPriceLow(priceHigh - 1)
        if(priceHigh === 0 || priceHigh === "") return
        handleFilter({low:priceLow, high:priceHigh}, null, togglePrice)
    }, [togglePrice, priceLow, priceHigh])


    return (
        <li className="d-flex flex-column filterPrice">
            <h4 onClick={  e => setToggle(pre => !pre)} className="border-bottom border-2 pb-1"><i class={`${!togglePrice ? "fa-regular":"fa-solid"} fa-circle`} style={{color: togglePrice ? "#4d5c46":null}}></i> Price</h4>
            <span className={`${togglePrice ? "d-flex":"d-none"} align-items-center mt-2`}>
                <input type="text" name="" id="" value={priceLow} disabled={priceHigh > 0 ? false:true} className="form-control w-50" placeholder="Low" onChange={ e => { if(/^[0-9\b]+$/.test(e.target.value) || e.target.value === '') {
                    setPriceLow(parseInt(e.target.value))  
                }}}/>
                <b className="mx-2">-</b>
                <input type="text" name="" value={priceHigh} id="" className="form-control w-50" placeholder="High" onChange={ e => { if(/^[0-9\b]+$/.test(e.target.value) || e.target.value === '') setPriceHigh(e.target.value)  }}/>
            </span>
        </li>
    )
}

export default Price;