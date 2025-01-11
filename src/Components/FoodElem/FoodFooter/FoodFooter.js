import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer Component : 
 *  
 * @component FoodFooter
 * @param {Number} id Id of the current food
 * @param {String} name Name of the current food
 * @param {Number} price Price of the current food
 * @param {function} setOrders state function used to update the current order when the food is added
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 * @param {function} closeDetail function used to reset the current order details and redirects to the dashboard page
 */
function FoodFooter({id, name, price, setOrders, orderDetails, setOrderDetails, closeDetail}) {
    //function used to reset the current order details and redirects to the dashboard page, used by the "Annuler" button
    const handleBackClick = () => {
        setOrderDetails({details: [], sups: []});
        closeDetail();
    }

    //formats the detail list of a selected food
    const getAllDetails = (base) => {
        let res = []
        base.forEach((detail) => {
            detail.list.forEach((elem) => {
                res.push(elem)
            })
        })
        return res;
    }

    //formats the ingredient list of a selected food
    const getAllSups = (base) => {
        let res = []
        let note
        base.forEach((e) => {
            let info = e.split(" ");
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
                default:
                    note = info.join(" ");
                    break;
            }
        })
        return {sup: res, note: note};
    }

    //function used to add the selected food to the current order and redirects to the dashboard page, used by the "Ajouter" button
    const addToOrder = () => {
        let details = getAllDetails(orderDetails.details);
        let sups = getAllSups(orderDetails.sups);
        let current = {food: id, plat: name, price: String(price), details: details, mods_ingredients: sups.sup, note: sups.note};
        setOrders(prevOrders => {
            let updatedOrders = [...prevOrders];
            updatedOrders[1] = [...updatedOrders[1], current];
            return updatedOrders;
        });
        setOrderDetails({details: [], sups: []});
        closeDetail();
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
    setOrderDetails: PropTypes.func.isRequired,
    closeDetail: PropTypes.func.isRequired,
}

export default FoodFooter;
