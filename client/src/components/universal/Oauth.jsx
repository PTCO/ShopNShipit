import { Link } from "react-router-dom";

const Oauth = ({type, icon, color}) => {
    return (
        <Link to={`http://localhost:5000/${type}`} className="bg-white border border-2 p-1 rounded mx-1 fa-beat" style={{animationIterationCount: 1, animationDuration: ".3s", animationDelay: '.15s'}}>
            <i className={`fa-brands fa-${icon} fa-2x`} style={{color: color ? color:null}}></i>
        </Link>
    );
}

export default Oauth;