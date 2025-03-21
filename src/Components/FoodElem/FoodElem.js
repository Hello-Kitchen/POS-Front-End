import React, { useState } from "react";
import PropTypes from "prop-types";

import DetailList from "../FoodElem/DetailList/DetailList";
import ModifButton from "../FoodElem/ModifButton/ModifButton";
import FoodHeader from "../FoodElem/FoodHeader/FoodHeader";
import FoodFooter from "../FoodElem/FoodFooter/FoodFooter";
import ModifBackButton from "../FoodElem/ModifButton/ModifBackButton";
import IngredientList from "../FoodElem/Ingredientlist/IngredientList";

/**
 * Component : Component displaying all food related to a category of a restaurant
 *
 * @component CategoryList
 */
function FoodList({
  foods,
  color,
  setOrders,
  orderDetails,
  setOrderDetails,
  selectedFood,
  setSelectedFood,
  inEdit,
  setInEdit,
}) {
  const [modifModale, setModifModale] = useState(false);

  const closeDetail = () => {
    setSelectedFood(null);
  };

  const openModif = () => {
    setModifModale(true);
  };

  const closeModif = () => {
    setModifModale(false);
  };

  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-8">
      <FoodHeader
        id={selectedFood.id}
        name={selectedFood.name}
        price={selectedFood.price}
        color={color}
      />
      <div className="w-full row-span-6">
        {modifModale ? (
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
            <ModifBackButton closeModif={closeModif} />
            <IngredientList
              data={selectedFood.ingredients}
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
            />
          </div>
        ) : (
          <div className="h-full w-full grid grid-flow-row grid-rows-6">
            <DetailList
              details={selectedFood.details}
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
            />
            <ModifButton
              id={selectedFood.id}
              food={selectedFood.food}
              foods={foods}
              color={color}
              openModif={openModif}
            />
          </div>
        )}
      </div>
      <FoodFooter
        food={selectedFood}
        setOrders={setOrders}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        closeDetail={closeDetail}
        inEdit={inEdit}
        setInEdit={setInEdit}
      />
    </div>
  );
}

FoodList.propTypes = {
  foods: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  setOrders: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setOrderDetails: PropTypes.func.isRequired,
  selectedFood: PropTypes.object.isRequired,
  setSelectedFood: PropTypes.func.isRequired,
  inEdit: PropTypes.bool.isRequired,
  setInEdit: PropTypes.func.isRequired,
};

export default FoodList;
