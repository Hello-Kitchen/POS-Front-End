import React from 'react';

function IngredientsButton() {
    return (
        <div className="w-full row-span-1 grid grid-flow-col grid-cols-4 bottom-0">
            <button className="col-span-1 bg-kitchen-button-green border border-white">
                <h1 className="text-3xl text-white float-left ml-4">Ajout</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-red border border-white">
                <h1 className="text-3xl text-white float-left ml-4">Retirer</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-red border border-white">
                <h1 className="text-3xl text-white float-left ml-4">Allergie</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-orange border border-white">
                <h1 className="text-3xl text-white float-left ml-4">Note</h1>
            </button>
        </div>
    )
}

export default IngredientsButton;
