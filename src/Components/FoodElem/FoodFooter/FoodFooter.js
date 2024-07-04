import React from 'react';

import { useNavigate, useLocation } from "react-router-dom";

function FoodFooter({name, price, orders, setOrders, orderDetails}) {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handleBackClick = () => {
        if (pathname.endsWith("modification")) {
            navigate(-3)
        } else {
            navigate(-2)
        }
    }

    const getAllDetails = (base) => {
        let res = []
        base.map((detail) => {
            detail.list.map((elem) => {
                res.push(elem)
            })
        })
        return res;
    }

    const getAllSups = (base) => {
        let res = []
        base.list.map((e) => {
            res.push(e.value)
        })
        return res;
    }

    const addToOrder = () => {
        let details = getAllDetails(orderDetails.details);
        let sups = getAllSups(orderDetails.sups);
        let current = {plat: name, price: price, details: details, sups: sups};
        let copy = orders;
        copy[1].push(current);
        setOrders(copy);
        if (pathname.endsWith("modification")) {
            navigate(-3)
        } else {
            navigate(-2)
        }
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col bottom-0">
            <button className="col-span-1 bg-kitchen-button-red shadow-button" onClick={() => handleBackClick()}>
                <h1 className="text-3xl font-bold text-white">Annuler</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-green shadow-button" onClick={() => addToOrder()}>
                <h1 className="text-3xl font-bold text-white">Ajouter</h1>
            </button>
        </div>
    )
}

export default FoodFooter;
