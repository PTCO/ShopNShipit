import { useContext } from "react";
import UserContext from "../../context/userContext";

const NotFound = () => {
    const { actions } = useContext(UserContext);
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <h2 className="p-2 mb-2 border-bottom border-2">Not Found</h2>
            <button className="btn btn-dark mt-2" onClick={ e => actions.navigate('/Login')}>Back</button>
        </div>
    )
}
 export default NotFound;