import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import SettingsContext from "../../context/settingsContext";

const BackBtn = ({text, path, checkout}) => {
    const { actions } = useContext(UserContext);
    const { settingsActions } = useContext(SettingsContext);

    useEffect(()=>{
        if(checkout) {
            settingsActions.setIsCheckout(false)
        }
    })

    return (
        <div className="d-flex align-items-center mb-1 mt-auto backBtn" >
            <button className="btn btn-dark " onClick={ e => actions.navigate(path ? path:-1)} style={{fontSize: ".95rem"}}><i className="fa-solid fa-caret-left"></i> {text}</button>
        </div>
    )
}

export default BackBtn;