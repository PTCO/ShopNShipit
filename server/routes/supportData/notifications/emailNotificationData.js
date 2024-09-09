module.exports = {
    confirmation: (data)=>{
        const {Order_ID, Status, AddressOne, AddressTwo, State, City, ZipCode, DeliveryDesc, DeliveryWindow, SubTotal, DeliveryCost, Tax, ItemCount} = data;
        return `
      <div style="width: 100%; height: 100%">
        <h1 style="
        width: 100%;
        display: flex;
        border-bottom: 2px solid;
        border-color: #4d5c46;
        padding: 0 0 5px 0;
        height: fit-content;
        margin-bottom: 10px;
        "  
        disabled>
            <a href="http://localhost:3000/Login" style="text-decoration: none;  display: flex; margin: 0 auto; width: fit-content;">
                <img src="https://i.ibb.co/5vYxHfb/Shop-NShipit.png" alt="company logo" style="width:50px; margin-left: auto; margin-right: 10px"> 
                <b style="color: #4d5c46; margin-right: auto" >Shop<b style="background: black; color: white; padding: 4px; border-radius: 4px">N</b><b style="color: #bd7c71">Shipit</b></b>
            </a>
        </h1>
        <div className="confirmation">
            <h2 style="padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;" >Order Placed</h2>
            <span style="display: flex">
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px"><b style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46">Confirmation #</b> ${Order_ID}</p>
            </span>
            <span style="display: flex;">
                <h5 style="margin: 0; margin-right: 5px;  font-size: 16px">Order Status</h5>
                <p style="padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0">${Status}</p>
            </span>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Shipping</h2>
                <div style="padding: 4px 10px; border-radius: 4px; border: 2px solid lightgray; margin-top: 15px; width: fit-content;">
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46; font-size: 17px;">${AddressOne} ${AddressTwo}</p>
                    <p style="color: #4d5c46; font-size: 17px; margin-top: 5px"></p>
                    <p style="font-size: 17px; margin: 5px 0; width: fit-content">${City}, ${State} ${ZipCode}</p>
                </div>
            </div>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Delivery Option</h2>
                <div style="padding: 4px 10px; border-radius: 4px; border: 2px solid lightgray; margin-top: 15px; width: fit-content;">
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46; font-size: 17px;">${DeliveryDesc}</p>
                    <p style="font-size: 17px;">${DeliveryWindow}</p>
                </div>
            </div>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Breakdown</h2>
                <div style="display: flex; margin-top: 10px">
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0; width: fit-content">Subtotal <b style="color: white;">$ ${SubTotal}</b></p>
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 8px; width: fit-content">Shipping <b style="color: white;">$ ${DeliveryCost}</b></p>
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0; width: fit-content">Tax <b style="color: white;">$ ${Tax}</b></p>
                </div>
                <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #4d5c46; height: fit-content; margin: auto 0; margin-top: 8px; width: fit-content">Total <b style="color: white;">$ ${(SubTotal + DeliveryCost + Tax)}</b></p>
                <span style="display: flex;">
                    <h3 style="display: flex; margin-right: 5px">Items Count</h3>
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46;">${ItemCount}</p>
                </span>
                <a href="http://localhost:3000/Home/Settings/Orders" style="margin-top: 10px; text-decoration: none; width: fit-content; display: inline-block;"><h3 style="width: fit-content; padding: 8px; border-radius: 4px; font-size: 16px;  color: white; background: #111; border-color: #111">View Order</h3></a>
            </div>
        </div>
      </div>`},
      orderUpdate: (data)=>{
        const {Order_ID, Status, DeliveryDate, DeliveryWindow}= data;
        console.log(data)
        return `
        <div style="width: 100%; height: 100%">
            <h1 style="
            width: 100%;
            display: flex;
            border-bottom: 2px solid;
            border-color: #4d5c46;
            padding: 0 0 5px 0;
            height: fit-content;
            margin-bottom: 10px;
            "  
            disabled>
                <a href="http://localhost:3000/Login" style="text-decoration: none;  display: flex; margin: 0 auto; width: fit-content;">
                    <img src="https://i.ibb.co/5vYxHfb/Shop-NShipit.png" alt="company logo" style="width:50px; margin-left: auto; margin-right: 10px"> 
                    <b style="color: #4d5c46; margin-right: auto" >Shop<b style="background: black; color: white; padding: 4px; border-radius: 4px">N</b><b style="color: #bd7c71">Shipit</b></b>
                </a>
            </h1>
            <div className="confirmation">
                <h2 style="padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;" >Order Status Updated</h2>
                <span style="display: flex">
                    <p style="font-size: 20px; font-weight: bold; margin-top: 5px; "><b style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46; margin-right: 3px;">Your Order # ${Order_ID} </b> status has changed</p>
                </span>
                <span style="display: flex;">
                    <h5 style="margin: auto 0; margin-right: 5px; font-size: 18px;">Order Status</h5>
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0; font-size: 20px">${Status === "Delivered" ? `${Status} on ${DeliveryDate}`:Status}</p>
                </span>
                ${Status === "Shipped" ? `<p style="height: fit-content; margin: 10px 0 0 0; font-size: 20px; width: fit-content;">Estimated delivery between <b style="padding: 4px; border-radius: 4px; background: lightgray;">${DeliveryWindow}</b></p>`:""}
                <a href="http://localhost:3000/Home/Settings/Orders/Details/${Order_ID}" style="margin-top: 10px; text-decoration: none; width: fit-content; display: inline-block;"><h3 style="width: fit-content; padding: 8px; border-radius: 4px; font-size: 16px;  color: white; background: #111; border-color: #111">View Order</h3></a>
            </div>
        </div>
        `
      }
}