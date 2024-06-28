import { Outlet } from "react-router-dom";

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const Layout = () => {
    return (
        <div className="column w-full h-full">
            <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" textRight="03/08/2024 - 12:35" />
            <div className="w-full h-4/5">
                <Currentcommand />
                <Outlet />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price="44.90" />
        </div>
    )
};

export default Layout;
