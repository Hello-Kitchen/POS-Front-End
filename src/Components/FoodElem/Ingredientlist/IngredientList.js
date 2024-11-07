import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Component handling and displaying all user input regarding ingredient choices and changes of the selected food
 * 
 * @component IngredientList
 * @param {[Object]} data Object Array of the ingredients of the current food
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 * @param {Object} buttonSelected Object containing the information of the current selected button
 * @param {function} setButtonSelected state function to update all selected button based on the current food choices
 */
function IngredientList({data, orderDetails, setOrderDetails, buttonSelected, setButtonSelected}) {

    let current = {value: "", done: false};
    
    // useState to map the ingredients of the current food, adding them a color for the button, and a boolean to handle user input
    const [fullData, setFullData] = useState(data.map((elem => {
        return {
            id: elem.id,
            name: elem.name,
            color: 'bg-kitchen-food-detail',
            selected: false
        }
    })));

    // useEffect to update the color and boolean of the ingredient buttons based on their previous state, to handle changes between different screen
    useEffect(() => {
        setFullData(prevFullData => {
            return prevFullData.map((data => {
                let color = data.color;
                let selected = false;
                if (buttonSelected.same === true && color === 'bg-kitchen-food-detail-selected') {
                    color = 'bg-kitchen-food-detail-selected';
                    selected = true;
                } else {
                    color = 'bg-kitchen-food-detail';
                    selected = false;
                }
                return {
                    id: data.id,
                    name: data.name,
                    color: color,
                    selected: selected
                }
            }))
        })
    }, [buttonSelected])

    //function called based on ingredient button clicked :
    //updates the ingredient button list based on user input
    //updates the current order details with the ingredient changes
    const handleClick = (name) => {
        setFullData(null)
        setFullData(fullData.map((data => {
            let color = data.color;
            let selected = data.selected;
            //Will update order details if a button from the IngredientsButton component was selected
            if (data.name === name && buttonSelected.active === true) {
                selected = data.selected ? false : true;
                let copy = orderDetails.sups;
                //If an ingredient button is selected, this function will add it, otherwise remove it
                if (selected) {
                    //conditions to handle the start of the list of choices
                    if (copy.list.length === copy.current + 1) {
                        //Will only add the ingredients if a choice was previously selected without an ingredient
                        if (copy.list[copy.current].done === false) {
                            current.value = copy.list[copy.current].value + " " + data.name;
                            current.done = true;
                            copy.list[copy.current] = current;
                            copy.current = copy.current + 1;
                            setOrderDetails({details: orderDetails.details, sups: copy});
                        }
                    } else {
                        if (copy.list[copy.current - 1] !== undefined) {
                            let mods = copy.list[copy.current - 1].value.split(" ");
                            current.value = mods[0] + " " + data.name;
                            current.done = true;
                            copy.list[copy.current] = current;
                            copy.current = copy.current + 1;
                            setOrderDetails({details: orderDetails.details, sups: copy});
                        }
                    }
                    //Updates button states for display
                    setButtonSelected({active: buttonSelected.active, same: true});
                    color = 'bg-kitchen-food-detail-selected';
                //removes ingredient if the button was previously selected
                } else {
                    let last = copy.list[copy.list.length - 1].value;
                    let mods = last.split(" ");
                    let to_del = mods[0] + " " + data.name;
                    copy.list = copy.list.filter(e => e.value !== to_del);
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

    //map to display a button for each ingredient of a food
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
    data: PropTypes.array.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired,
    buttonSelected: PropTypes.object.isRequired,
    setButtonSelected: PropTypes.func.isRequired
}


export default IngredientList;
