import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate, useLocation } from "react-router-dom";

function FoodFooter({name, price, setOrders, orderDetails, setOrderDetails}) {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handleBackClick = () => {
        setOrderDetails({details: [], sups: {current: 0, list: []}});
        if (pathname.endsWith("modification")) {
            navigate(-3)
        } else {
            navigate(-2)
        }
    }

    const getAllDetails = (base) => {
        let res = []
        base.foreach((detail) => {
            detail.list.mapeach((elem) => {
                res.push(elem)
            })
        })
        return res;
    }

    const getAllSups = (base) => {
        let res = []
        base.list.foreach((e) => {
            res.push(e.value)
        })
        return res;
    }

    const addToOrder = () => {
        let details = getAllDetails(orderDetails.details);
        let sups = getAllSups(orderDetails.sups);
        let current = {plat: name, price: String(price), details: details, sups: sups};
        setOrders(prevOrders => {
            let updatedOrders = [...prevOrders];
            updatedOrders[1] = [...updatedOrders[1], current];
            return updatedOrders;
        });
        setOrderDetails({details: [], sups: {current: 0, list: []}});
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

FoodFooter.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    setOrders: PropTypes.func.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}

export default FoodFooter;
