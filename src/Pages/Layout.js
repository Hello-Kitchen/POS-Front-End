import { Outlet } from "react-router-dom";
import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const Layout = ({ orders, price, config, setConfig, setOrders, priceLess, setPriceLess, payList, setPayList }) => {
    return (
        <div className="column w-full h-full">
            <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" />
            <div className="w-full h-4/5">
                <Currentcommand orders={orders} config={config} setConfig={setConfig} setOrders={setOrders} price={price} priceLess={priceLess} payList={payList} />
                <Outlet context={{ orders, setOrders, price, config, setConfig, priceLess, setPriceLess, payList, setPayList }} />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price={price.toString()} config={config} setConfig={setConfig} />
        </div>
    )
};

export default Layout;
