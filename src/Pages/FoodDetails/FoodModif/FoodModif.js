import React, { useState } from 'react';

import { useLocation, useOutletContext } from "react-router-dom";

import IngredientsButton from "../../../Components/FoodElem/IngredientsButton/IngredientsButton";
import ModifBackButton from "../../../Components/FoodElem/ModifButton/ModifBackButton";
import IngredientList from "../../../Components/FoodElem/Ingredientlist/IngredientList";

import NewIngredientList from '../../../Components/FoodElem/Ingredientlist/NewIngredientList';

/**
 * Component : Page, Component displaying the ingredient page of a food based on the router location
 * 
 * @component FoodModif
 */
function FoodModif() {

    const location = useLocation();
    const {food} = location.state || {};
    const {orderDetails, setOrderDetails} = useOutletContext();

    console.log(food)

    return ( 
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
              <ModifBackButton />
              <NewIngredientList data={food.ingredients} orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>
              {/* <IngredientsButton orderDetails={orderDetails} setOrderDetails={setOrderDetails} setButtonSelected={setButtonSelected} /> */}
              {/* <IngredientList data={food.ingredients} orderDetails={orderDetails} setOrderDetails={setOrderDetails} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected} /> */}
          </div>

    )
}

export default FoodModif;