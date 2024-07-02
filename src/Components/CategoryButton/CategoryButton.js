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
        navigate(route + id, {state: {food: food}})
    }
    return (
        <div className="col-span-1">
            <button 
                className="h-full w-full"
                style={{ backgroundColor: color }}
                onClick={() => handleClick()}
                type="button"
            >
                <h1 className="text-3xl font-bold text-white">
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