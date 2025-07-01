import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component used to display a color band next to the current food - recalls food category
 * 
 * @component FoodStick
 * @param {string} color Color code of the food category
 */
function FoodStick({color}) {
    return (
        <div className={`${color} mr-2 col-span-1 mt-2 mb-2 ml-1 sm:mr-4 rounded`} />
    );
}

FoodStick.propTypes = {
    color: PropTypes.string.isRequired,
};

export default FoodStick;
