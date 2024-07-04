import React from 'react';

import { useLocation } from "react-router-dom";

import FoodHeader from "../../Components/FoodElem/FoodHeader/FoodHeader";
import FoodFooter from "../../Components/FoodElem/FoodFooter/FoodFooter";

import { Outlet } from "react-router-dom";


function FoodLayout() {

    const location = useLocation();
    const {id, food, color} = location.state || {};

    if (food != null) {
      return (
        <div className="h-full w-3/4 grid grid-flow-row grid-rows-8">
              <FoodHeader id={id} name={food.name} price={food.price} color={color} />
          <div className="w-full row-span-6">
              <Outlet />
          </div>
            <FoodFooter />
        </div>
      )
    }
}

export default FoodLayout;