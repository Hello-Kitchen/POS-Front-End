import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer Component : 
 *  
 * @component FoodFooter
 * @param {Object} food object of the current food
 * @param {function} setOrders state function used to update the current order when the food is added
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 * @param {function} closeDetail function used to reset the current order details and redirects to the dashboard page
 * @param {boolean} inEdit boolean used to know if the page is active because of a modification
 * @param {function} setInEdit function to update inEdit boolean
 */
function FoodFooter({food, setOrders, orderDetails, setOrderDetails, closeDetail, inEdit, setInEdit}) {
    //function used to reset the current order details and redirects to the dashboard page, used by the "Annuler" button
    const handleBackClick = () => {
        setOrders(prevOrders => {
            let updatedOrders = prevOrders;
            if (updatedOrders.tmp && Object.keys(updatedOrders.tmp).length > 0) {
                updatedOrders.tmp = {};
            }
            return updatedOrders;
        });
        setOrderDetails({details: [], sups: []});
        setInEdit(false);
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
                    res.push({type: "ADD", ingredient: info[1], suppPrice: info[2]});
                    break;
                case "Retirer":
                    res.push({type: "DEL", ingredient: info[1]});
                    break;
                case "Allergie":
                    res.push({type: "ALE", ingredient: info[1]});
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
        let price = Number(food.price);
        let quantity = 1;
        setOrders(prevOrders => {
            let updatedOrders = { ...prevOrders };
            if (inEdit) {
                quantity = updatedOrders.tmp.quantity
                const index = updatedOrders.food.findIndex(item => JSON.stringify(item) === JSON.stringify(updatedOrders.tmp));
                if (index !== -1) {
                    updatedOrders.food[index] = { ...updatedOrders.food[index], ...current };
                    updatedOrders.tmp = {};
                }
                if (updatedOrders.tmp && Object.keys(updatedOrders.tmp).length > 0) {
                    updatedOrders.tmp = {};
                }
            } else {
                updatedOrders.food = [...updatedOrders.food, current];
            }
            return updatedOrders;
        });
        let current = {food: food.id, name: food.name, price: String(price), details: details, mods_ingredients: sups.sup, note: sups.note, quantity: quantity, category: food.id_category};
        setOrderDetails({details: [], sups: []});
        setInEdit(false);
        closeDetail();
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col bottom-0">
            <button className="col-span-1 bg-kitchen-button-red shadow-button" onClick={() => handleBackClick()}>
                <h1 className="text-3xl font-bold text-white">Annuler</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-green shadow-button" onClick={() => addToOrder()}>
                <h1 className="text-3xl font-bold text-white">{inEdit ? "Modifier" : "Ajouter"}</h1>
            </button>
        </div>
    )
}

FoodFooter.propTypes = {
    food: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired,
    closeDetail: PropTypes.func.isRequired,
    inEdit: PropTypes.bool.isRequired,
    setInEdit: PropTypes.func.isRequired,
}

export default FoodFooter;
