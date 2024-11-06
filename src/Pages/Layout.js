import React from 'react';
import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import CurrentCommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const Layout = ({ orders, price, config, setConfig, setOrders, priceLess, setPriceLess, payList, setPayList, orderDetails, setOrderDetails }) => {
    return (
        <div className="column w-full h-full">
            <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" />
            <div className="w-full h-4/5">
                <CurrentCommand orders={orders} config={config} setConfig={setConfig} setOrders={setOrders} price={price} priceLess={priceLess} payList={payList} />
                <Outlet context={{ orders, setOrders, price, config, setConfig, priceLess, setPriceLess, payList, setPayList, orderDetails, setOrderDetails }} />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price={price.toString()} config={config} setConfig={setConfig} priceLess={priceLess} setOrders={setOrders} />
        </div>
    )
};

Layout.propTypes = {
    orders: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    setPayList: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
    setPriceLess: PropTypes.func.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}

export default Layout;
