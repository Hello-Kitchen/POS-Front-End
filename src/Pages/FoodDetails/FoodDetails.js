import React from 'react';

import { useLocation, useOutletContext } from "react-router-dom";

import DetailList from "../../Components/FoodElem/DetailList/DetailList";
import ModifButton from "../../Components/FoodElem/ModifButton/ModifButton";

/**
 * Component : Page, Component displaying the detail page of a food based on the router location
 * 
 * @component FoodDetails
 */
function FoodDetails() {

    const location = useLocation();
    const {id, food, foods, color} = location.state || {};
    const {orderDetails, setOrderDetails} = useOutletContext();

    if (food != null) {
      return (
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
              <DetailList details={food.details} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
              <ModifButton id={id} food={food} foods={foods} color={color} />
          </div>
      )
    }
}

export default FoodDetails;