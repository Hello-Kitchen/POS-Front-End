import React from 'react';

import { useLocation, useOutletContext } from "react-router-dom";

import ModifBackButton from "../../../Components/FoodElem/ModifButton/ModifBackButton";

import IngredientList from '../../../Components/FoodElem/Ingredientlist/IngredientList';

/**
 * Component : Page, Component displaying the ingredient page of a food based on the router location
 * 
 * @component FoodModif
 */
function FoodModif() {

    const location = useLocation();
    const {food} = location.state || {};
    const {orderDetails, setOrderDetails} = useOutletContext();

    return ( 
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
              <ModifBackButton />
              <IngredientList data={food.ingredients} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
          </div>

    )
}

export default FoodModif;