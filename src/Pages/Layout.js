import { Outlet } from "react-router-dom";

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const Layout = () => {
    return (
        <div className="column w-full h-full">
            <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" textRight="03/08/2024 - 12:35" />
            <div className="w-full h-4/5">
                <Currentcommand orders={[{nb: '42'}, [{plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], sups: ['Supplement fromages', 'Allergie Oignons']}, {plat: 'Entrecote Classique', price: '22.30', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel'}, {stop: true}, {plat: 'Brownie', price: '7.00'}, {plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], sups: ['Supplement fromages', 'Allergie Oignons']}, {plat: 'Entrecote Classique', price: '22.30', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel'}]]}/>
                <Outlet />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price="44.90" />
        </div>
    )
};

export default Layout;
