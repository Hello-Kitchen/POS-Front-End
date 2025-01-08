import React from 'react';
import PropTypes from 'prop-types';

import FoodStick from '../FoodStick/FoodStick';

/**
 * Component : Component handling a specific detail of a food, user inputs, and displays the choices
 * 
 * @component FoodButton
 * @param {Number} id id of the specific food
 * @param {String} name name of a specific food
 * @param {String} color color code of the current food category
 * @param {String} route route containing the category of the food, used for navigation
 * @param {function} handleClick function used to redirect to the food page
 */
function FoodButton({id, name, color, handleClick}) {

    return (
        <div className="bg-white col-span-1 row-span-1 grid grid-cols-12 border-b-2 border-b-white">
            <FoodStick color={color} />
            <button 
                className="h-full w-full col-span-11"
                onClick={() => handleClick(id)}
                type="button"
            >
                <h1 className="text-3xl font-bold text-black text-left">
                    {name}
                </h1>
            </button>
        </div>
    );
}

FoodButton.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default FoodButton;
