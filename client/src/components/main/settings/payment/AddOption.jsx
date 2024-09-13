import { useContext, useState } from "react";
import Form from "../../../universal/Form";
import SettingsContext from "../../../../context/settingsContext";
import BackBtn from "../../../universal/BackBtn";

const AddOption = () => {
    const { settingsActions , isCheckout } = useContext(SettingsContext);


    return (
        <div className={`mt-2 ${isCheckout ? 'col-4':null}`}>
            <Form
                inputs={[
                    {type: "text", label: "Cardholder Name", id: "cardholder", name: "cardholder"},
                    {type: "number", label: "Card Number", id: "cardNumber", name: "cardnumber", limit: 16}, 
                    {type: "number", label: "CVV", name: "cvv", id: "cvv", limit: 3},
                    {type: "text", label: "Exp", name: "expiration", id: "expiration", limit: 5}
                ]}
                buttons={[{type: "submit", text: "Add"}]}
                legend={"Add Card Option"}
                oauth={false}
                method={settingsActions.addOption}
                type={"payment"}
            />
            <div className={`mt-5 ${isCheckout ? 'mobileCheckoutBtnContainer':''} border-top border-2 pt-2 `}>
                {isCheckout ?
                <span className="mobileCheckoutBtn" >
                    <BackBtn text={`Checkout`} path={"/Home/Checkout"} checkout={true}/>
                </span>
                :
                <BackBtn text={`Payment`} path={"/Home/Settings/Payments"}/>
                }
            </div>
        </div>
    )
}

export default AddOption;