import React from "react";
import PropTypes from "prop-types";

import { IoMdArrowRoundBack } from "react-icons/io";

/**
 * FoodListHeader component renders a header for the food list with a back button and a title.
 *
 * @param {string} name - The name to be displayed in the header.
 * @param {string} color - The background color class for the header.
 * @param {Function} onBackClick - The function to be called when the back button is clicked.
 * @returns {JSX.Element} The FoodListHeader component.
 */
export default function FoodListHeader({ name, color, onBackClick }) {
    return (
        <div className={`h-[5%] ${color} grid grid-cols-3 grid-rows-1`}>
            <div className="flex items-center pl-2" onClick={onBackClick}>
                <IoMdArrowRoundBack color="white" size={25}/>
                <p className="text-white text-2xl font-semibold">Retour</p>    
            </div>
            <div className="flex justify-center items-center">
                <p className="text-white text-3xl font-bold">{name}</p>
            </div>
        </div>
    )
}

FoodListHeader.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired,
}