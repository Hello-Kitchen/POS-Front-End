import React from 'react';
import PropTypes from 'prop-types';

function FoodStick({color}) {
    return (
        <div className={`${color} col-span-1 mt-2 mb-2 ml-1 mr-4 rounded`} />
    );
}

FoodStick.propTypes = {
    color: PropTypes.string.isRequired,
};

export default FoodStick;
