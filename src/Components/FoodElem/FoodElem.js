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
 * @component FoodElem
 * @param {String} color color of the category
 * @param {Function} setOrders state function used to update the current order as a whole
 * @param {Object} orderDetails Object containing all relevant informations of the current order
 * @param {Function} setOrderDetails state function used to update the current order details
 * @param {Object} selectedFood Object containing all relevant informations of the chosen food
 * @param {Function} setSelectedFood state function used to update the selected food
 * @param {Boolean} inEdit boolean used to know if it's a new food, or a previous being edited
 * @param {Function} setInEdit state function used to update inEdit
 */
function FoodElem({
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
            <ModifButton openModif={openModif} />
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

FoodElem.propTypes = {
  color: PropTypes.string.isRequired,
  setOrders: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setOrderDetails: PropTypes.func.isRequired,
  selectedFood: PropTypes.object.isRequired,
  setSelectedFood: PropTypes.func.isRequired,
  inEdit: PropTypes.bool.isRequired,
  setInEdit: PropTypes.func.isRequired,
};

export default FoodElem;
