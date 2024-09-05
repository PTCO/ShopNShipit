import BackBtn from "../../universal/BackBtn";
import { useContext } from "react";
import UserContext from "../../../context/userContext";

const Settings = () => {
    const { actions } = useContext(UserContext);

    return (
        <div>
            <div className="my-2">
                <h2 className="border-bottom border-2 pb-1 mb-2 settingsTitle" >Orders</h2>
                <ul>
                    <li className="p-2 border border-2 rounded fw-bold" onClick={ e => actions.navigate('/Home/Settings/Orders')}><i class="fa-solid fa-box fa-xl"></i> Your Orders</li>
                </ul>
            </div>
            <div className="mb-2">
                <h2 className="border-bottom border-2 pb-1 mb-2 settingsTitle" >Account</h2>
                <ul>        
                    <li className="p-2 border border-2 rounded fw-bold" onClick={ e => actions.navigate('/Home/Settings/Profile')}><i class="fa-solid fa-user fa-xl"></i> Profile</li>
                    <li className="p-2 border border-2 rounded fw-bold mt-2" onClick={ e => actions.navigate('/Home/Settings/Security')}><i class="fa-solid fa-shield-halved fa-xl"></i> Security</li>
                    <li className="p-2 border border-2 rounded fw-bold my-2" onClick={ e => actions.navigate('/Home/Settings/Payments')}><i class="fa-regular fa-credit-card fa-xl"></i> Payment Options</li>
                    <li className="p-2 border border-2 rounded fw-bold" onClick={ e => actions.navigate('/Home/Settings/Shipping')}><i class="fa-solid fa-truck-fast fa-xl"></i> Shipping address</li>
                </ul>
            </div>
            <div className="mt-3 border-top border-2 pt-2">
                <BackBtn text={"Home"} path={"/Home"}/>
            </div>
        </div>
    )
}

export default Settings;