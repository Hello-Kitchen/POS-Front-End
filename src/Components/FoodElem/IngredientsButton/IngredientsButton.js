import React from 'react';

function IngredientsButton() {
    return (
        <div className="h-4/6 w-full row-span-2 grid grid-flow-col bottom-0">
            <button className="col-span-1 bg-kitchen-button-green">
                <h1 className="text-3xl font-bold text-white">Ajout</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-red">
                <h1 className="text-3xl font-bold text-white">Retirer</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-red">
                <h1 className="text-3xl font-bold text-white">Allergie</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-orange">
                <h1 className="text-3xl font-bold text-white">Note</h1>
            </button>
        </div>
    )
}

export default IngredientsButton;
