import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate, useLocation } from "react-router-dom";

function FoodFooter({id, name, price, setOrders, orderDetails, setOrderDetails}) {

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
        base.forEach((detail) => {
            detail.list.forEach((elem) => {
                res.push(elem)
            })
        })
        return res;
    }

    const getAllSups = (base) => {
        let res = []
        base.list.forEach((e) => {
            let info = e.value.split(" ");
            switch (info[0]) {
                case "Supplément":
                    res.push({type: "ADD", ingredient: info[1]});
                    break;
                case "Retirer":
                    res.push({type: "DEL", ingredient: info[1]});
                    break;
                case "Allergie":
                    res.push({type: "ALL", ingredient: info[1]});
                    break;
                    default: break;
            }
        })
        return res;
    }

    const addToOrder = () => {
        let details = getAllDetails(orderDetails.details);
        let sups = getAllSups(orderDetails.sups);
        let current = {food: id, plat: name, price: String(price), details: details, mods_ingredients: sups};
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    setOrders: PropTypes.func.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}

export default FoodFooter;
