import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

import CategoryButton from '../../Components/CategoryButton/CategoryButton';
import FoodList from "../../Components/FoodList/FoodList";

/**
 * Component : Page, Displays all the food categories of the restaurant
 * 
 * @component Dashboard
 * @param {function} setOrders state function used to update the current order when the food is added
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function Dashboard({ setOrders, orderDetails, setOrderDetails }) {
    const data = localStorage.getItem("data");
    const { setPriceLess, price, setPayList } = useOutletContext();
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ categoryFood, setCategoryFood ] = useState();

    useEffect(() => {
      setPriceLess(price);
      setPayList([]);
    }, [price, setPriceLess, setPayList]);

    const handleCategoryClick = async (id) => {
      const tmp = await JSON.parse(data).find((elem) => elem.id === id).food;
      setCategoryFood(tmp);
      setSelectedCategory(id);
    }

    const colors = [
      "bg-category-red",
      "bg-category-purple",
      "bg-category-orange",
      "bg-category-green",
      "bg-category-blue",
      "bg-category-cyan"
    ]
    const buttons = JSON.parse(data).map((elem) =>
      <CategoryButton key={elem.id} id={elem.id} name={elem.name} food={elem.food} color={colors[elem.id] != null ? colors[elem.id] : colors[0]} handleClick={(id) => handleCategoryClick(id)}/>
  );

  return (
    <div className="h-full w-3/4">
      { selectedCategory ?
      <div className="h-full w-full">
        <div className="h-5 w-full bg-black text-white" onClick={() => setSelectedCategory(null)}>
          TMP BACK BTN
        </div>
        <div className="h-full w-full">
          <FoodList foods={categoryFood} color={colors[selectedCategory]} setOrders={setOrders} orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>
        </div>
      </div>
      : 
        <div className="h-full grid grid-cols-2 grid-rows-8 content-start">
            {buttons}
        </div>
      }
    </div>
  );
}


Dashboard.propTypes = {
    setOrders: PropTypes.func.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired,
};

export default Dashboard;
