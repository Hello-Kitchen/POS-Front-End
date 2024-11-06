import React from 'react';

import { GoArrowDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";

/**
 * Header Component : used to change page from the ingredient modification page of a food to the detail modification page
 * 
 * @component ModifButton
 */
function ModifBackButton() {

    const navigate = useNavigate();
    //Function called on button click, navigates to the previous page, the food detail page
    const handleClick = () => {
        navigate(-1)
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


export default ModifBackButton;
