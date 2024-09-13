import { useContext } from "react";
import UserContext from "../../../context/userContext";
import Navigation from "./nav/Navigation";
import { Outlet } from "react-router-dom";

const Home = () => {
    const { user , actions } = useContext(UserContext);
    if(user) {
        return (
            <div className="w-100 h-100 d-flex flex-column justify-content-center pt-1 px-4 home">
                <Navigation />
                <Outlet />
            </div>
        )
    }
}

export default Home;