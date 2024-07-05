import React, { useState } from 'react';

import { useLocation, useOutletContext } from "react-router-dom";

import IngredientsButton from "../../../Components/FoodElem/IngredientsButton/IngredientsButton";
import ModifBackButton from "../../../Components/FoodElem/ModifButton/ModifBackButton";
import IngredientList from "../../../Components/FoodElem/Ingredientlist/IngredientList";

function FoodModif() {

    const location = useLocation();
    const {food} = location.state || {};
    const {orderDetails, setOrderDetails} = useOutletContext();
    const [buttonSelected, setButtonSelected] = useState({active: false, same: false});

    return ( 
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
              <ModifBackButton />
              <IngredientsButton orderDetails={orderDetails} setOrderDetails={setOrderDetails} setButtonSelected={setButtonSelected} />
              <IngredientList data={food.ingredients} orderDetails={orderDetails} setOrderDetails={setOrderDetails} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected} />
          </div>

    )
}

export default FoodModif;