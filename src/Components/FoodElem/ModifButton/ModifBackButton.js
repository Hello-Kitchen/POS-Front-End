import React from 'react';
import PropTypes from 'prop-types';

import { GoArrowDown } from "react-icons/go";

/**
 * Header Component : used to change page from the ingredient modification page of a food to the detail modification page
 * 
 * @component ModifButton
 * @param {function} closeModif function used to close the modification page
 */
function ModifBackButton({closeModif}) {

    //Function called on button click, navigates to the previous page, the food detail page
    const handleClick = () => {
        closeModif();
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col grid-cols-6 colbottom-0 content-center pl-6 pr-6">
            <div className="w-full col-span-5 justify-items-center flex-row content-center">
                <h1 className="text-3xl font-bold text-black">
                    Modifications
                </h1>
            </div>
            <div className="col-span-1 w-full grid justify-items-end float-right">
                <button onClick={() => handleClick()}>
                    <GoArrowDown size={40} color="black" />
                </button>
            </div>
        </div>
    )
}

ModifBackButton.propTypes = {
    closeModif: PropTypes.func.isRequired,
}

export default ModifBackButton;
