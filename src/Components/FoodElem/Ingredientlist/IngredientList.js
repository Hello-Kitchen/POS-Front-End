import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({data}) {

    const choice = data.map((elem) =>
        <div key={elem.id} className="bg-kitchen-food-detail border border-white h-20 col-span-1 flex content-center" >
            <button>
                <h1 className="text-3xl text-white float-left ml-4">
                    {elem.name}
                </h1>
            </button>
        </div>
    );

    return (
        <div className="row-span-4 w-full pt-8">
            <div className="grid grid-flow-row grid-cols-4 overflow-auto scrollbar-hide">
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
