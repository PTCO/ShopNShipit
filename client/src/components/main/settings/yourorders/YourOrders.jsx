import { useContext, useEffect } from "react";
import BackBtn from "../../../universal/BackBtn";
import SettingsContext from "../../../../context/settingsContext";
import Order from "./Order";

const YourOrders = () => {
    const { orders , settingsActions } = useContext(SettingsContext);

    useEffect(()=>{
        settingsActions.getOrders();
    }, [])

    return (
        <>
        <div className="d-flex flex-column settingsOption">
            <h2 className="border-bottom border-2 pb-1 mt-2 mb-2 settingsTitle" >Orders</h2>
            <div className="d-flex flex-column overflow-y-auto h-100 orders">
                {orders.map( (order, index) => {
                    return (<Order key={order.Order_ID} index={index} status={order.Status} id={order.Order_ID} itemcount={order.ItemsCount} subtotal={order.SubTotal} shippingprice={order.ShippingPrice} tax={order.Tax} cart={order.Cart} thumbnail={order.Thumbnail} />)
                })}
            </div>
            <div className="mt-auto border-top border-2 pt-2">
                <BackBtn text={"Settings"} path={"/Home/Settings"}/>
            </div>
        </div>
        </>
    )
}

export default YourOrders;