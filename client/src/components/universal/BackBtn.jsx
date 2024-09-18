import { useContext } from "react";
import UserContext from "../../context/userContext";

const BackBtn = ({text, path}) => {
    const { actions } = useContext(UserContext);
    return (
        <div className="d-flex align-items-center mt-auto backBtn" >
            <button className="btn btn-dark " onClick={ e => actions.navigate(path ? path:-1)} style={{fontSize: ".95rem"}}><i className="fa-solid fa-caret-left"></i> {text}</button>
        </div>
    )
}

export default BackBtn;