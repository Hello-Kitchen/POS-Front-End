import React from 'react';

import { useLocation } from "react-router-dom";

import DetailList from "../../Components/FoodElem/DetailList/DetailList";
import ModifButton from "../../Components/FoodElem/ModifButton/ModifButton";

function FoodDetails() {

    const location = useLocation();
    const {id, food} = location.state || {};

    if (food != null) {
      console.log(food.details)
      return (
          <div className="h-5/6 w-full grid grid-flow-row p-2">
              <DetailList id={id} name={food.name} ingredients={food.ingredients} details={food.details}/>
              <ModifButton id={id} food={food}/>
          </div>
      )
    }
}

export default FoodDetails;