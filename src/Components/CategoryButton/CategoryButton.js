import React from 'react';
import PropTypes from 'prop-types';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CategoryButton({id, name, color, food, route}) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("food_category/"+id, JSON.stringify(food));
      }, [id, food]);

    const handleClick = () => {
        navigate(route + id, {state: {food: food, color: color}})
    }
    return (
        <div className={`${color} col-span-1 row-span-1`}>
            <button 
                className="h-full w-full"
                onClick={() => handleClick()}
                type="button"
            >
                <h1 className="text-3xl font-bold text-white text-left ml-5">
                    {name}
                </h1>
            </button>
        </div>
    );
}

CategoryButton.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    food: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
}

export default CategoryButton;