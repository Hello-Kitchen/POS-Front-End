import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Component handling a specific category, redirect to a page with all food associated to it
 * 
 * @component CategoryButton
 * @param {Number} id id of the specific category
 * @param {String} name name of a specific category
 * @param {String} color color code of the category
 * @param {String} route route used for navigation of the food page
 * @param {function} handleClick function used to redirect to the food page
 */
function CategoryButton({id, name, color, handleClick}) {

    return (
        <div className={`${color} col-span-1 sm:row-span-1 sm:h-full h-20`}>
            <button 
                className="h-full w-full"
                onClick={() => handleClick(id)}
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
    handleClick: PropTypes.func.isRequired,
}

export default CategoryButton;