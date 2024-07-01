import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import Currentcommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";

const data = 
[
    {nb: '42'}, 
    [
        {plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], sups: ['Supplement fromages', 'Allergie Oignons']},
        {plat: 'Entrecote Classique', price: '22.30', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel'},
        {stop: true},
        {plat: 'Brownie', price: '7.00'},
        {plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], sups: ['Supplement fromages', 'Allergie Oignons']}, 
        {plat: 'Entrecote Classique', price: '22.30', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel'}
    ]
];

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const Layout = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [config, setConfig] = useState({payement: false});

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
                <Currentcommand orders={data}/>
                <Outlet />
            </div>
            <LayoutFooter buttons={["tables", "commandes", "transactions", "manager"]} price="44.90" config={config} setConfig={setConfig} />
        </div>
    )
};

export default Layout;
