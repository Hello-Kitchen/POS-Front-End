import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({name, data}) {

    console.log(data)
    const choice = data.map((elem) =>
        <div className="bg-kitchen-food-detail">
            <button>
                <h1 className="text-3xl font-bold text-white">
                    {elem.name}
                </h1>
            </button>
        </div>
    );

    return (
        <div className="h-full w-full row-span-5">
            <h1 className="text-3xl font-bold text-black">{name}</h1>
            <div className="h-full w-full grid grid-cols-4 content-start">
                {choice}
            </div>
        </div>
    )
}

IngredientList.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}


export default IngredientList;
