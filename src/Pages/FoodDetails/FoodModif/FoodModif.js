import React from 'react';

import { useLocation } from "react-router-dom";

import IngredientsButton from "../../../Components/FoodElem/IngredientsButton/IngredientsButton";
import ModifBackButton from "../../../Components/FoodElem/ModifButton/ModifBackButton";
import IngredientList from "../../../Components/FoodElem/Ingredientlist/IngredientList";

function FoodModif() {

    const location = useLocation();
    const {id, food} = location.state || {};
    

    return ( 
          <div className="h-5/6 w-full grid grid-flow-row p-2">
              <ModifBackButton />
              <IngredientsButton />
              <IngredientList id={id} data={food.ingredients} />
          </div>

    )
}

export default FoodModif;