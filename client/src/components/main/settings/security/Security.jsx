import { useContext } from "react";
import UserContext from "../../../../context/userContext";
import BackBtn from "../../../universal/BackBtn";

const Security = () => {
    const { actions , user } = useContext(UserContext);
    return (
        <>
        <h2 className="border-bottom border-2 pb-1 my-2 settingsTitle" >Security</h2>
        <nav className="mb-2">
            <ul>        
                <li className={`${user.googleAuth ? "d-none":null} p-2 border border-2 rounded fw-bold`} onClick={ e => actions.navigate('/Home/Settings/Security/Password')}><i class="fa-solid fa-lock fa-xl"></i> Change Password</li>
                <li className="p-2 border border-2 rounded fw-bold my-2" onClick={ e => actions.navigate('/Home/Settings/Security/Username')}><i class="fa-solid fa-address-card fa-xl"></i> Change Username</li>
            </ul>
        </nav>
        <div className="mt-auto border-top border-2 pt-2">
            <BackBtn text={"Settings"} path={"/Home/Settings"}/>
        </div>
        </>
    )
}

export default Security;