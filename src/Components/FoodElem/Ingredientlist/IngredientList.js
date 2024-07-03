import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientList({data}) {

    const [fullData, setFullData] = useState(data.map((elem => {
        return {
            id: elem.id,
            name: elem.name,
            color: 'bg-kitchen-food-detail',
            selected: false
        }
    })));

    const handleClick = (name) => {
        setFullData(null)
        setFullData(fullData.map((data => {
            let color = "bg-kitchen-food-detail";
            let selected = false;
            if (data.name === name) {
                selected = data.selected ? false : true;
                if (selected) {
                    color = 'bg-kitchen-food-detail-selected';
                } else {
                    color = 'bg-kitchen-food-detail';
                }
            }
            return {
                id: data.id,
                name: data.name,
                color: color,
                selected: selected
            }
        })))
    }

    const choice = fullData.map((elem) =>
        <div key={elem.id} className={`${elem.color} border border-white h-20 col-span-1 flex content-center ${elem.selected ? "shadow-button" : ""}`} >
            <button className="h-full w-full" onClick={() => handleClick(elem.name)}>
                <h1 className="text-2xl text-white float-left ml-4">
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
