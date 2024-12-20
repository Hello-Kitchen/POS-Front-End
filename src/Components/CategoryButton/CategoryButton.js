import React from 'react';
import PropTypes from 'prop-types';

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component : Component handling a specific category, redirect to a page with all food associated to it
 * 
 * @component CategoryButton
 * @param {Number} id id of the specific category
 * @param {String} name name of a specific category
 * @param {String} color color code of the category
 * @param {[Object]} food Object Array with all food of the category
 * @param {String} route route used for navigation of the food page
 */
function CategoryButton({id, name, color, food, route}) {
    const navigate = useNavigate();

    //sets in local storage the foods of the category, to get them in each specific food pages
    useEffect(() => {
        localStorage.setItem("food_category/"+id, JSON.stringify(food));
      }, [id, food]);

    //navigates to the category page
    const handleClick = () => {
        navigate(route + id, {state: {foods: food, color: color}})
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
    food: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
}

export default CategoryButton;