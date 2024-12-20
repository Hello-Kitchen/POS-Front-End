import React from 'react';

import { useLocation } from "react-router-dom";

import FoodButton from "../../Components/FoodButton/FoodButton";

/**
 * Component : Component displaying all food related to a category of a restaurant
 * 
 * @component CategoryList
 */
function CategoryList() {

    const location = useLocation();
    const { foods, color } = location.state || {};

    //maps all food of a category
    const foodButton = foods.map((food) =>
      <FoodButton key={food.id}
          id={food.id}
          name={food.name}
          food={food}
          foods={foods}
          color={color} route={``}/>
    );

    return (
        <div className="h-full grid grid-cols-4 grid-rows-8 content-start bg-grey-bg overflow-auto">
            {foodButton}
        </div>
    )

}

export default CategoryList;