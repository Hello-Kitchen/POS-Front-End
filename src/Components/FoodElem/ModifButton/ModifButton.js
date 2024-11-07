import React from 'react';
import PropTypes from 'prop-types';

import { GoArrowUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";

/**
 * Footer Component : used to change page from the detail modification page of a food to the ingredient modification page
 * 
 * @component ModifButton
 * @param {Object} food Current selected food object
 * @param {string} color Color code of the food category
 */
function ModifButton({food, color}) {

    const navigate = useNavigate();
    //Function called on button click, navigates to the food ingredients modification page
    const handleClick = () => {
        navigate("modification", {state: {food: food, color: color}})
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col colbottom-0 p-6 content-center border-t-2 border-t-black">
            <div className="w-full col-span-5 justify-items-center flex-row content-center">
                <h1 className="text-3xl font-bold text-black">
                    Modifications
                </h1>
            </div>
            <div className="col-span-1 w-full grid justify-items-end float-right">
                <button onClick={() => handleClick()}>
                    <GoArrowUp size={40} color="black" />
                </button>
            </div>
        </div>
    )
}


ModifButton.propTypes = {
    food: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired
}

export default ModifButton;
