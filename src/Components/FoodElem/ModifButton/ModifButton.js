import React from 'react';
import PropTypes from 'prop-types';

import { GoArrowRight } from "react-icons/go";

/**
 * Footer Component : used to change page from the detail modification page of a food to the ingredient modification page
 * 
 * @component ModifButton
 * @param {function} openModif function used to open the modification page
 */
function ModifButton({openModif}) {

    //Function called on button click, navigates to the food ingredients modification page
    const handleClick = () => {
        openModif();
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col colbottom-0 p-6 content-center border-t-2 border-t-black">
            <div className="w-full col-span-5 justify-items-start flex-row content-center">
                <h1 className="text-3xl font-bold text-black">
                    Modifications
                </h1>
            </div>
            <div className="col-span-1 w-full grid justify-items-end float-right">
                <button onClick={() => handleClick()}>
                    <GoArrowRight size={40} color="black" />
                </button>
            </div>
        </div>
    )
}


ModifButton.propTypes = {
    openModif: PropTypes.func.isRequired,
}

export default ModifButton;
