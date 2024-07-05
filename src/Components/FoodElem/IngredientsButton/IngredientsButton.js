import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsButton({orderDetails, setOrderDetails, setButtonSelected}) {

    let current = {value: "", done: false};
    const [buttonData, setButtonData] = useState([
        {
            name: "Supplément",
            color: "bg-kitchen-button-green",
            selected: false
        },
        {
            name: "Retirer",
            color: "bg-kitchen-button-red",
            selected: false
        },
        {
            name: "Allergie",
            color: "bg-kitchen-button-red",
            selected: false
        },
        {
            name: "Note",
            color: "bg-kitchen-button-orange",
            selected: false
        }
    ]);

    const handleClick = (name) => {
        setButtonData(null)
        setButtonData(buttonData.map((data => {
            let color = data.color;
            let selected = false;
            if (data.name === name) {
                selected = true;
                if (selected && data.name !== "Note") {
                    let copy = orderDetails.sups;
                    current.value = data.name;
                    copy.list[copy.current] = current;
                    setOrderDetails({details: orderDetails.details, sups: copy});
                    setButtonSelected({active: true, same: false});
                }
            }
            return {
                name: data.name,
                color: color,
                selected: selected
            }
        })))
    }

    const buttons = buttonData.map((buttonElem) =>
        <div key={buttonElem.name} className={`col-span-1 ${buttonElem.color} border border-white ${buttonElem.selected ? "shadow-button" : ""}`}>
            <button key={buttonElem.name} className="h-full w-full" onClick={() => handleClick(buttonElem.name)}>
                <h1 className="text-3xl text-white float-left ml-4">{buttonElem.name}</h1>
            </button>
        </div>
    );

    return (
        <div className="w-full row-span-1 grid grid-flow-col grid-cols-4 bottom-0">
            {buttons}
        </div>
    )
}

IngredientsButton.propTypes = {
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired,
    setButtonSelected: PropTypes.func.isRequired
}

export default IngredientsButton;
