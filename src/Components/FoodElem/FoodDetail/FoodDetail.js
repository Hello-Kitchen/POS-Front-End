import React from 'react';
import PropTypes from 'prop-types';

import { useState } from "react";

function FoodDetail({name, data, multiple}) {

    const [fullData, setFullData] = useState(data.map((name => {
        return {
            name: name,
            color: 'bg-kitchen-food-detail',
            selected: false
        }
    })));

    const handleClick = (name) => {
        setFullData(null)
        setFullData(fullData.map((data => {
            let color = data.color;
            let selected = data.selected;
            if (multiple === false) {
                color = 'bg-kitchen-food-detail';
                selected = false;
            }
            if (data.name === name) {
                selected = data.selected ? false : true;
                if (selected) {
                    color = 'bg-kitchen-food-detail-selected';
                } else {
                    color = 'bg-kitchen-food-detail';
                }
            }
            return {
                name: data.name,
                color: color,
                selected: selected
            }
        })))
    }

    const choice = fullData.map((elem) =>
        <div
            key={elem.name}
            className={`${elem.color} h-20 col-span-1 border border-white ${elem.selected ? "shadow-button" : ""}`}
        >
            <button className="h-full w-full" onClick={() => handleClick(elem.name)}>
                <h1 className="text-2xl text-white float-left ml-4">
                    {elem.name}
                </h1>
            </button>
        </div>
    );

    return (
        <div className="w-full grid grid-flow-row">
            <div className='h-20 flex content-center'>
                <h1 className="text-3xl font-bold text-black self-center ml-8">{name}</h1>
            </div>
            <div className="w-full grid grid-cols-4 mb-2">
                {choice}
            </div>
        </div>
    )
}

FoodDetail.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    multiple: PropTypes.bool.isRequired
}


export default FoodDetail;
