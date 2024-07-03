import React from 'react';
import PropTypes from 'prop-types';

import { useState } from "react";

function FoodDetail({name, data, multiple, orderDetails, setOrderDetails}) {

    let detailObj = {name: name, list: []};
    const [fullData, setFullData] = useState(data.map((elem => {
        let color = 'bg-kitchen-food-detail';
        let selected = false;
        let copy = orderDetails.details;
        let check = copy.filter(e => e.name === name);
        if (check.length != 0 && check[0].list.find(e => e === elem)) {
            color = 'bg-kitchen-food-detail-selected';
            selected = true;
        }
        return {
            name: elem,
            color: color,
            selected: selected
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
                let copy = orderDetails.details;
                if (selected) {
                    color = 'bg-kitchen-food-detail-selected';
                    copy = copy.filter(e => e.name === detailObj.name);
                    let temp = detailObj.list;
                    if (copy.length != 0) {
                        temp = copy[0].list;
                    }
                    if (multiple === false) {
                        temp = [data.name];
                    } else {
                        temp.push(data.name);
                    }
                    detailObj = {name: detailObj.name, list: temp};
                } else {
                    copy = copy.filter(e => e.name === detailObj.name);
                    let temp = detailObj.list;
                    if (copy.length != 0) {
                        temp = copy[0].list;
                        temp = temp.filter(e => e !== data.name);
                        detailObj = {name: detailObj.name, list: temp};
                    }
                    color = 'bg-kitchen-food-detail';
                }
                let arr = orderDetails.details;
                arr = arr.filter(e => e.name !== detailObj.name);
                let sups = orderDetails.sups;
                arr.push(detailObj);
                setOrderDetails({details: arr, sups: sups});
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
