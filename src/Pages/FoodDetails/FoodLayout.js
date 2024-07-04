import React from 'react';

import { useLocation } from "react-router-dom";

import FoodHeader from "../../Components/FoodElem/FoodHeader/FoodHeader";
import FoodFooter from "../../Components/FoodElem/FoodFooter/FoodFooter";

import { Outlet, useOutletContext } from "react-router-dom";

function FoodLayout() {

    const location = useLocation();
    const {id, food, color} = location.state || {};
    const {setOrders, orderDetails, setOrderDetails} = useOutletContext();

    if (food != null) {
      return (
        <div className="h-full w-3/4 grid grid-flow-row grid-rows-8">
              <FoodHeader id={id} name={food.name} price={food.price} color={color} />
          <div className="w-full row-span-6">
              <Outlet context={{ orderDetails, setOrderDetails }} />
          </div>
            <FoodFooter name={food.name} price={food.price} setOrders={setOrders} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
        </div>
      )
    }
}

export default FoodLayout;