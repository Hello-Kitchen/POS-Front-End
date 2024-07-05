import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

import FoodStick from '../FoodStick/FoodStick';

function FoodButton({id, name, color, food, route}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route + id, {state: {id: id, food: food, color: color}})
    }

    return (
        <div className="bg-white col-span-1 row-span-1 grid grid-cols-12 border-b-2 border-b-white">
            <FoodStick color={color} />
            <button 
                className="h-full w-full col-span-11"
                onClick={() => handleClick()}
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
    food: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
}

export default FoodButton;
