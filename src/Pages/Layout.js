import { Outlet } from "react-router-dom";

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const Layout = () => {
    return (
        <div className="column w-full h-full">
            <LayoutHeader />
            <div className="w-full h-4/5">
                <Currentcommand />
                <Outlet />
            </div>
            <LayoutFooter />
        </div>
    )
};

export default Layout;
