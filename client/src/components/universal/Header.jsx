import { useContext } from "react";
import UserContext from "../../context/userContext";
import ShopNShipitLogo  from '../../assets/ShopNShipit.png';

const Header = () => {
    const { user , location , actions } = useContext(UserContext);
    return (
        <header className="d-flex flex-column align-items-center  py-2">
            <nav className="d-flex align-items-center justify-content-between w-100 px-3">
                <h1><img id="SNSLogo" src={ShopNShipitLogo} alt="" /> <b style={{color: "#4d5c46"}}>Shop</b><b className="p-1 bg-dark  text-white border border-1 rounded">N</b><b style={{color: "#bd7c71"}}>Shipit</b></h1>
                {user ? 
                <ul>
                    <li><button className="btn btn-dark" onClick={ e => actions.navigate('/Signout')}>Signout</button></li>
                </ul>
                :
                <ul>
                    {location.pathname === '/Login' ? 
                    <li><button className="btn btn-dark" onClick={ e => actions.navigate('/Signup')}>Signup</button></li>
                    :
                    <li><button className="btn btn-dark" onClick={ e => actions.navigate('/Login')}>Login</button></li>
                    }
                </ul>
                }
            </nav>
        </header>
    );
}

export default Header;