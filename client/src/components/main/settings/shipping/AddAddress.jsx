import { useContext } from 'react';
import BackBtn from '../../../universal/BackBtn';
import Form from '../../../universal/Form';
import SettingsContext from '../../../../context/settingsContext';

const AddAddress = () => {
    const { settingsActions, isCheckout } = useContext(SettingsContext);
    return (
        <div className={`mt-2 ${isCheckout ? 'col-4':null}`}>
            <Form 
                inputs={[
                    {type: "address", label: "Address One", id: "addressOne", name: "addressone"},
                    {type: "address", label: "Address Two", id: "addressTwo", name: "addresstwo"},
                    {type: "address", label: "City", id: "City", name: "city"},
                    {type: "state", label: "State", id: "State", name: "state"},
                    {type: "number", label: "Zip", id: "ZipCode", name: "zip", limit: 5},
                ]}
                buttons={[{type: "submit", text: "Submit"}]}
                oauth={false}
                method={settingsActions.addAddress}
                legend={"Add New Address"}
            />
            <div className={`mt-5 ${isCheckout ? 'mobileCheckoutBtnContainer':''} border-top border-2 pt-2 `}>
                {isCheckout ?
                <span className="mobileCheckoutBtn">
                    <BackBtn text={`Checkout`} path={"/Home/Checkout"}/>
                </span>
                :
                <BackBtn text={`Shipping`} path={"/Home/Settings/Shipping"}/>
                }
            </div>
        </div>
    )
}

export default AddAddress;