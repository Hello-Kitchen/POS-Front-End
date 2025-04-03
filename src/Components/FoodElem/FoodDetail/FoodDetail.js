import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Component handling a specific detail of a food, user inputs, and displays the choices
 * 
 * @component FoodDetail
 * @param {String} name Name of the food detail
 * @param {[Object]} data Object Array of the current detail information of a food
 * @param {Boolean} multiple Boolean, used to know if multiple detail options can be chosen
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function FoodDetail({ name, data, multiple, orderDetails, setOrderDetails }) {
    // Initialize data based on the previous state of the details buttons
    const initializeData = () => {
        const existingDetail = orderDetails.details.find(detail => detail.name === name);
        const selectedItems = existingDetail ? existingDetail.list : [];
        return data.map(item => ({
            name: item.name,
            selected: selectedItems.includes(item),
            color: selectedItems.includes(item)
                ? 'bg-kitchen-food-detail-selected'
                : 'bg-kitchen-food-detail',
        }));
    };

    const [fullData, setFullData] = useState(initializeData);

    // Update order details object with the new details
    const updateOrderDetails = (updatedItems) => {
        const updatedDetails = orderDetails.details.filter(detail => detail.name !== name);
        if (updatedItems.length > 0) {
            updatedDetails.push({name, list: updatedItems});
        }
        setOrderDetails({...orderDetails, details: updatedDetails});
    };

    // Handle click on a detail choice
    const handleClick = (clickedName) => {
        const updatedData = fullData.map(item => {
            // if multiple is false, will deselects other options
            if (!multiple && item.name !== clickedName) {
                return {...item, selected: false, color: 'bg-kitchen-food-detail'};
            }
            if (item.name === clickedName) {
                const isSelected = !item.selected;
                return {
                    ...item,
                    selected: isSelected,
                    color: isSelected ? 'bg-kitchen-food-detail-selected' : 'bg-kitchen-food-detail',
                };
            }
            return item;
        });
        const selectedItems = updatedData.filter(item => item.selected).map(item => item.name);
        setFullData(updatedData);
        updateOrderDetails(selectedItems);
    };

    const choice = fullData.map((elem) => (
        <div
            key={elem.name}
            className={`${elem.color} h-20 col-span-1 border border-white ${elem.selected ? 'shadow-button' : ''}`}
        >
            <button className="h-full w-full" onClick={() => handleClick(elem.name)}>
                <h1 className="text-2xl text-white float-left ml-4">{elem.name}</h1>
            </button>
        </div>
    ));

    return (
        <div className="w-full grid grid-flow-row">
            <div className="h-20 flex content-center">
                <h1 className="text-3xl font-bold text-black self-center ml-8">
                    {name}
                </h1>
            </div>
            <div className="w-full grid grid-cols-4 mb-2">
                {choice}
            </div>
        </div>
    );
}

FoodDetail.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    multiple: PropTypes.bool.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}

export default FoodDetail;
