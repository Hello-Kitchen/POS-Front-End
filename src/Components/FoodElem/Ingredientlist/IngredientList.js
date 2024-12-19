import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Component handling and displaying all user input regarding ingredient choices and changes of the selected food
 * 
 * @component IngredientList
 * @param {[Object]} data Object Array of the ingredients of the current food
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function IngredientList({data, orderDetails, setOrderDetails}) {

    const [fullData, setFullData] = useState(data.map((elem => {
        return {
            id: elem.id,
            name: elem.name,
            color_add: 'bg-kitchen-food-ingredient-green',
            color_del: 'bg-kitchen-food-ingredient-red',
            color_all: 'bg-kitchen-food-ingredient-red',
            active: false
        }
    })));

    const removeDuplicate = (detailsList, name) => {
        let newList = []
        detailsList.map((detail => {
            if (detail.includes(name) === false) {
                newList.push(detail)
            }
            return detail;
        }))
        return newList;
    }

    const updateButtonColor = (button, color) => {
        switch (color) {
            case "green":
                if (button === 'bg-kitchen-food-ingredient-green') {
                    return ['bg-kitchen-food-ingredient-green-selected', true];
                } else {
                    return ['bg-kitchen-food-ingredient-green', false];
                }
            case "red":
                if (button === 'bg-kitchen-food-ingredient-red') {
                    return ['bg-kitchen-food-ingredient-red-selected', true];
                } else {
                    return ['bg-kitchen-food-ingredient-red', false];
                }
            default: break;
        }
    }

    const updateAllButtons = (button, data) => {
        let [res, act] = []
        switch (button.name) {
            case "Supplément":
                [res, act] = updateButtonColor(data.color_add, "green");
                data.color_add = res;
                data.active = act;
                data.color_del = 'bg-kitchen-food-ingredient-red';
                data.color_all = 'bg-kitchen-food-ingredient-red';
                break;
            case "Retirer":
                [res, act] =  updateButtonColor(data.color_del, "red");
                data.color_del = res;
                data.active = act;
                data.color_add = 'bg-kitchen-food-ingredient-green';
                data.color_all = 'bg-kitchen-food-ingredient-red';
                break;
            case "Allergie":
                [res, act] = updateButtonColor(data.color_all, "red");
                data.color_all = res;
                data.active = act;
                data.color_add = 'bg-kitchen-food-ingredient-green';
                data.color_del = 'bg-kitchen-food-ingredient-red';
                break;
            default: break;
        }
        return data;
    }

    const handleClick = (event, name) => {
        setFullData(null)
        setFullData(fullData.map((data => {
            let color_change = data;
            if (name === data.name) {
                let action = event.target.name;
                let cpy = orderDetails
                cpy.sups = removeDuplicate(cpy.sups, name)
                color_change = updateAllButtons(event.target, data)
                if (color_change.active === true) {
                    cpy.sups.push(action + " " + name)
                }
                setOrderDetails({details: orderDetails.details, sups: cpy.sups})
            }
            return {
                id: data.id,
                name: data.name,
                color_add: color_change.color_add,
                color_del: color_change.color_del,
                color_all: color_change.color_all
            }
        })))
    }

    const noteButton = (
        <div className={`w-full row-span-1 grid grid-flow-col grid-cols-12 colbottom-0 content-center pl-6 pr-6`} >
            <div className='col-span-10'>
                <h1 className="text-3xl text-black float-left ml-4">
                    Note
                </h1>
            </div>
            <div className='w-full col-span-2 grid grid-flow-col grid-cols-5'>
                <button className='text-3xl border-4 border-kitchen-food-detail-selected text-white col-start-3 justify-items-center col-span-3 self-center mt-1 mb-1 ml-1 rounded-full bg-kitchen-food-detail-selected h-current-cmd-content'>
                    Ajouter
                </button>
            </div>
        </div>
    )

    const choice = fullData.map((elem) =>
        <div key={elem.id} className={`${elem.color} h-15 w-full grid grid-flow-col grid-cols-12 colbottom-0 content-center pl-6 pr-6 mb-1`} >
            <div className='h-full col-span-10'>
                <h1 className="text-3xl text-black float-left ml-4">
                    {elem.name}
                </h1>
            </div>
            <div className='h-full w-full col-span-2 grid grid-flow-col grid-cols-5'>
                <button name="Supplément" onClick={(e) => handleClick(e, elem.name)} className={`${elem.color_add} text-3xl text-white border-4 border-kitchen-food-ingredient-green col-span-1 mr-1 rounded-full aspect-square w-full h-full`}>
                    +
                </button>
                <button name="Retirer" onClick={(e) => handleClick(e, elem.name)} className={`${elem.color_del} text-3xl text-white border-4 border-kitchen-food-ingredient-red col-span-1 self-center ml-1 rounded-full w-full h-full aspect-square`}>
                    -
                </button>
                <button name="Allergie" onClick={(e) => handleClick(e, elem.name)} className={`${elem.color_all} text-3xl text-white border-4 border-kitchen-food-ingredient-red justify-items-center col-span-3 self-center ml-2 rounded-full h-full`}>
                    Allergie
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full row-span-5 overflow-auto scrollbar-hide">
            {choice}
            {noteButton}
        </div>
    )
}

IngredientList.propTypes = {
    data: PropTypes.array.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}


export default IngredientList;
