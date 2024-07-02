import React from 'react';

import { useLocation } from "react-router-dom";

import IngredientsButton from "../../../Components/FoodElem/IngredientsButton/IngredientsButton";
import ModifBackButton from "../../../Components/FoodElem/ModifButton/ModifBackButton";
import IngredientList from "../../../Components/FoodElem/Ingredientlist/IngredientList";

function FoodModif() {

    const location = useLocation();
    const {id, food, color} = location.state || {};
    
    console.log(color)
    return ( 
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
              <ModifBackButton />
              <IngredientsButton />
              <IngredientList id={id} data={food.ingredients} />
          </div>

    )
}

export default FoodModif;