import React from 'react';

import { useLocation } from "react-router-dom";

import FoodHeader from "../../Components/FoodElem/FoodHeader/FoodHeader";
import FoodFooter from "../../Components/FoodElem/FoodFooter/FoodFooter";

import { Outlet } from "react-router-dom";

function FoodLayout() {

    const location = useLocation();
    const {id, food} = location.state || {};

    if (food != null) {
      console.log(food.details)
      return (
        <div className="h-full w-3/4">
          <div className="h-5/6 w-full p-2">
              <FoodHeader id={id} name={food.name} price={food.price} />
              <Outlet />
          </div>
            <FoodFooter />
        </div>
      )
    }
}

export default FoodLayout;