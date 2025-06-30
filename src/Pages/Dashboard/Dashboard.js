import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import CategoryButton from "../../Components/CategoryButton/CategoryButton";
import FoodList from "../../Components/FoodList/FoodList";

/**
 * Component : Page, Displays all the food categories of the restaurant
 *
 * @component Dashboard
 * @param {[Object]} orders current order
 * @param {function} setOrders state function used to update the current order when the food is added
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function Dashboard({ orders, setOrders, orderDetails, setOrderDetails }) {
  const data = localStorage.getItem("data");
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryFood, setCategoryFood] = useState();

  useEffect(() => {
    if (orders.tmp && Object.keys(orders.tmp).length > 0) {
      console.log("orders.tmp", orders.tmp);
      const obj = JSON.parse(data).find((elem) => elem.food.find((f) => f.id === orders.tmp.food));
      setCategoryFood(obj.food)
      setSelectedCategory(obj.id)
    }
  }, [orders, data]);

  const handleCategoryClick = async (id) => {
    const localFoods = JSON.parse(data).find((elem) => elem.id === id).food;
  
    setCategoryFood(localFoods);
    setSelectedCategory(id);
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food?foodCategory=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 401) {
        throw new Error("Unauthorized access. Please log in.");
      }
  
      const apiFoods = await response.json();
      const localData = JSON.parse(localStorage.getItem("data")) || [];
  
      const updatedFoods = await Promise.all(
        apiFoods.map(async (apiFood) => {
          const localFood = localFoods.find(
            (localFood) => localFood === apiFood
          );
  
          // If food already exists in the cache
          if (localFood) {
            return {
              ...apiFood,
              details: localFood.details,
              ingredients: localFood.ingredients,
            };
          }
  
          // If food is new
          const foodDetailsResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food/${apiFood.id}?useCase=POS`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (foodDetailsResponse.status === 401) {
            throw new Error("Unauthorized access. Please log in.");
          }
  
          const newFoodDetails = await foodDetailsResponse.json();
          return newFoodDetails;
        })
      );
  
      const updatedLocalData = localData.map((category) => {
        if (category.id === id) {
          return { ...category, food: updatedFoods };
        }
        return category;
      });
  
      setCategoryFood(updatedFoods);
      localStorage.setItem("data", JSON.stringify(updatedLocalData));
    } catch (error) {
      console.log(error);
    }
  };

  const colors = [
    "bg-category-red",
    "bg-category-purple",
    "bg-category-orange",
    "bg-category-green",
    "bg-category-blue",
    "bg-category-cyan",
  ];

  const buttons = JSON.parse(data).map((elem) => (
    <CategoryButton
      key={elem.id}
      id={elem.id}
      name={elem.name}
      food={elem.food}
      color={colors[elem.id] != null ? colors[elem.id] : colors[0]}
      handleClick={(id) => handleCategoryClick(id)}
    />
  ));

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food_category`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized access. Please log in.");
        }
        return response.json();
      })
      .then((data) => {
        const localData = JSON.parse(localStorage.getItem("data")) || [];

        const updatedData = data.map((apiCategory) => {
          const localCategory = localData.find(
            (localCategory) => localCategory.id === apiCategory.id && localCategory.name === apiCategory.name
          );
          // If the category already exists
          if (localCategory) {
            return {
              ...apiCategory,
              food: localCategory.food || [], // The food array is not changed (not in the API call)
            };
          }
          // If it's a new category
          return {
            ...apiCategory,
            food: [], // The food array will be loaded when the user clicks on the category
          };
        });
        localStorage.setItem("data", JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-full w-full lg:w-3/4">
      {selectedCategory ? (
        <div className="h-full w-full">
          <FoodList
            foods={categoryFood}
            color={colors[selectedCategory] != null ? colors[selectedCategory] : colors[0]}
            orders={orders}
            setOrders={setOrders}
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
            name={JSON.parse(data).find((elem) => elem.id === selectedCategory).name}
            onBackClick={() => setSelectedCategory(null)}
          />
        </div>
      ) : (
        <div className="h-full grid grid-cols-2 grid-rows-8 content-start">
          {buttons}
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  orders: PropTypes.object.isRequired,
  setOrders: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setOrderDetails: PropTypes.func.isRequired,
};

export default Dashboard;
