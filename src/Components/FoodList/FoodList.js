import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


import FoodButton from "../../Components/FoodButton/FoodButton";
import FoodElem from "../FoodElem/FoodElem";
import FoodListHeader from "./FoodListHeader";

/**
 * Component : Component displaying all food related to a category of a restaurant
 *
 * @component FoodList
 * @param {Array} foods list of all food of a category
 * @param {String} color color code of the category
 * @param {[Object]} orders current order
 * @param {function} setOrders state function used to update the current order when the food is added
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 * @param {String} name name of the category
 * @param {function} onBackClick function to go back to the previous
 */
function FoodList({ foods, color, orders, setOrders, orderDetails, setOrderDetails, name, onBackClick }) {
  const [selectedFood, setSelectedFood] = useState();
  const [inEdit, setInEdit] = useState(false);

  const handleFoodClick = (food) => {
    setSelectedFood(foods.find((f) => f.id === food));
  };

  const transformOrder = (order, categoryDetails) => {
    const modTypeMap = {
        ADD: "Supplément",
        DEL: "Retirer",
        ALE: "Allergie",
    };

    let detailsTemp = []
    categoryDetails.forEach((category) => {
      const selectedDetails = order.details.filter(detail => 
        category.data.some(item => item.name === detail)
      );
      if (selectedDetails.length > 0) {
        detailsTemp.push({name: category.name, list: selectedDetails})
      }
    })
    return {
        details: detailsTemp,
        sups: [...order.mods_ingredients.map((mod) => `${modTypeMap[mod.type] || mod.type} ${mod.ingredient}`),
            ...(order.note ? [order.note] : []),
        ],
    };
  };

  useEffect(() => {
    if (orders.tmp && Object.keys(orders.tmp).length > 0) {
      const baseFood = foods.find((food) => food.id === orders.tmp.food);
      if (baseFood) {
        setSelectedFood(baseFood)
        setOrderDetails(transformOrder(orders.tmp, baseFood.details))
        setInEdit(true)
      }
    } else {
      setSelectedFood(null)
      setInEdit(false)
    }
  }, [orders, foods, setOrderDetails]);

  //maps all food of a category
  const foodButtons = foods.map((food) => (
    <FoodButton
      key={food.id}
      id={food.id}
      name={food.name}
      food={food}
      foods={foods}
      color={color}
      handleClick={(food) => handleFoodClick(food)}
    />
  ));

  return (
    <div className="h-full w-full overflow-hidden">
      <div className={`h-full w-full bg-grey-bg transition-all duration-200 ${selectedFood ? "blur-sm" : ""}`}>
        <FoodListHeader
          color={color}
          name={name}
          onBackClick={onBackClick}
        />
        <div className="h-[95%] grid grid-cols-2 lg:grid-cols-4 grid-rows-8 content-start overflow-auto">
          {foodButtons}
        </div>
      </div>
      {selectedFood && (
        <div>
          <div className="h-food-top absolute sm:w-3/4 inset-0 z-10 bg-transparent"/>
          <div className="top-food-top bottom-[75px] absolute sm:h-4/6 xl:w-3/4 lg:w-3/5 w-full bg-white flex justify-center items-center  transition-all duration-200">
            <FoodElem
              foods={foods}
              color={color}
              setOrders={setOrders}
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
              inEdit={inEdit}
              setInEdit={setInEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

FoodList.propTypes = {
  foods: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  orders: PropTypes.object.isRequired,
  setOrders: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setOrderDetails: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default FoodList;
