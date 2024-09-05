import { useContext } from "react";
import UserContext from "../../context/userContext";
import { useLocation } from "react-router-dom";

const FooterBtn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();

    if(!location.pathname.includes('/Home/Footer')) {
        return (
            <footer className="d-flex align-items-center justify-content-center w-100 mx-auto mt-auto pb-4 footerBtn">
                <p className="d-flex align-items-center bg-dark text-white px-1  fs-6 fw-bold rounded" onClick={ e => actions.navigate('/Home/Footer', {state: location.pathname})}>See Footer <i class="fa-solid fa-caret-up fa-xl ms-1 "></i></p>
            </footer>
        )
    }
}

export default FooterBtn;