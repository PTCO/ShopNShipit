import { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import ImageCarousel from "./ImageCarousel";
import FindProduct from "../../assets/FindProducts.png"
import ViewProducts from "../../assets/ViewProducts.png"
import ReviewProducts from "../../assets/ReviewProducts.png"
import FilterProducts from "../../assets/FilterProducts.png"
import ManageCart from "../../assets/ManageCart.png"
import Checkout from "../../assets/Checkout.png"
import CheckoutAddress from "../../assets/CheckoutAddress.png"
import CheckoutReview from "../../assets/CheckoutReview.png"
import NavandAddItems from "../../assets/NavandAddItems.png"
import SettingsOrders from "../../assets/SettingsOrders.png"
import SettingsAccount from "../../assets/SettingsAccount.png"
import OrdersDetails from "../../assets/OrdersDetails.png"
import { Link, useLocation } from "react-router-dom";
import About from "./About";

const Footer = () => {
    const { actions } = useContext(UserContext);
    const [about, setAbout ] = useState(true);

    const location = useLocation();

    return (
        <footer className="d-flex flex-column w-100 mx-auto pt-2 mt-auto footerBtn">
            <p className="d-flex align-items-center bg-dark text-white px-1 mx-auto  fs-6 fw-bold rounded " onClick={ e => actions.navigate(location.state ? location.state: "/Home")}>
                Close Footer <i class="fa-solid fa-caret-down fa-xl ms-1 "></i>
            </p>
            <div className="d-flex pt-3  text-center flex-column mt-1 w-100 fullFooter">
                <h6 className="border-bottom border-2 pb-2 mb-2 contactTitle">Contact</h6>
                <span className="d-flex justify-content-center align-items-center">
                    <b className="text-white p-1 rounded me-3" style={{background: "#bd7c71"}}>Socials</b>
                    <Link to={"https://www.instagram.com/ptco.dev/"} className="bg-dark text-white border-0 px-2 py-1 rounded">
                        <i class="fa-brands fa-instagram fa-2x "></i>
                    </Link>
                    <Link to={"https://www.facebook.com/profile.php?id=61559539658958"} className=" text-white mx-3 border-0 px-2 py-1 rounded" style={{background: "#4d5c46"}}>
                        <i class="fa-brands fa-facebook fa-2x"></i>
                    </Link>
                    <Link to={"https://x.com/BrandonDurand16"} className=" text-white border-0 px-2 py-1 rounded" style={{background: "#bd7c71"}}>
                        <i class="fa-brands fa-square-x-twitter fa-2x"></i>
                    </Link>
                </span>
                <span className="border-bottom border-2 pb-2 mb-2 mt-3 d-flex align-items-center justify-content-center text-center w-100 aboutNav">
                    <button onClick={ e => setAbout(true)} className="me-1 bg-dark text-white py-1  px-3 rounded" style={{opacity: !about ? ".35":"1"}} >About</button>
                    <button onClick={ e => setAbout(false)} className="ms-1 text-white py-1 px-3 rounded" style={{opacity: about ? ".35":"1", background: "#4d5c46", borderColor: "#4d5c46"}}>Help</button>
                </span>
                <div className={`${about ? "d-none":"d-flex"} justify-content-center help`}>
                    <ImageCarousel images={[FindProduct, ViewProducts ,ReviewProducts, FilterProducts, ManageCart, Checkout, CheckoutAddress, CheckoutReview, NavandAddItems, SettingsOrders, SettingsAccount, OrdersDetails ]} /> 
                </div>
                <div className={`${!about ? "d-none":"d-flex"} justify-content-center`}>
                    <div className="aboutContainer">
                        <h2 className="border-bottom border-2 mb-3 w-25 mx-auto"  style={{fontFamily: "copal-std-outline"}}>About</h2>
                        <About />
                    </div>
                    <div className="aboutHelp">
                        <h2 className="border-bottom border-2 mb-3 w-25 mx-auto" style={{fontFamily: "copal-std-outline"}}>Help</h2>
                        <ImageCarousel images={[FindProduct, ViewProducts ,ReviewProducts, FilterProducts, ManageCart, Checkout, CheckoutAddress, CheckoutReview, NavandAddItems, SettingsOrders, SettingsAccount, OrdersDetails ]} />
                    </div>
                </div>
                <p className="mx-auto fw-bold fs-6 mb-5 mt-auto copyright">&copy; <small>Copyright of PTCO</small></p>
            </div>
        </footer>
    )
}

export default Footer;