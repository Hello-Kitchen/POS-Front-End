import React from 'react';
import PropTypes from 'prop-types';

import FoodStick from '../../FoodStick/FoodStick';

/**
 * Header Component : Header Component of the food page, displays the relevant information of the selected food
 * 
 * @component FoodHeader
 * @param {String} name Name of the current food
 * @param {Number} price Price of the current food
 * @param {String} color Color code of the current food category, used by the FoodStick
 */
function FoodHeader({name, price, color}) {

    return (
        <div className="w-full row-span-1 grid grid-flow-col grid-cols-48 border-b-2 border-b-black">
            <FoodStick color={color} />
            <div className="h-full col-span-36 content-center self-center flex">
                <h1 className="text-3xl font-bold text-black text-left self-center">
                    {name}
                </h1>
            </div>
            <div className="col-span-11 w-full grid justify-items-end float-right pr-2 self-center">
                <h1 className="text-3xl font-bold text-black">
                    {price}€
                </h1>
            </div>
        </div>
    )
}

FoodHeader.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}


export default FoodHeader;
