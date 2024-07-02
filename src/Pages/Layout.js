import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const Layout = ({ orders, price, config }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="column w-full h-full">
            <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" textRight={formatDate(currentTime)} />
            <div className="w-full h-4/5">
                <Currentcommand orders={orders} config={config} />
                <Outlet />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price={price.toString()} config={config} />
        </div>
    )
};

export default Layout;
