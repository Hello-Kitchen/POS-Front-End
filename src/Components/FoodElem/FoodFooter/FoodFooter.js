import React from 'react';

import { useNavigate, useLocation } from "react-router-dom";

function FoodFooter() {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const handleBackClick = () => {
        if (pathname.endsWith("modification")) {
            navigate(-2)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="h-1/6 w-full grid grid-flow-col bottom-0">
            <button className="col-span-1 bg-kitchen-button-red" onClick={() => handleBackClick()}>
                <h1 className="text-3xl font-bold text-white">Annuler</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-green">
                <h1 className="text-3xl font-bold text-white">Ajouter</h1>
            </button>
        </div>
    )
}

export default FoodFooter;
