import React from "react";
import { useLocation, Outlet, useOutletContext } from "react-router-dom";
import CategoryList from "./CategoryList";

function CategoryLayout() {

  const location = useLocation();
  const {setOrders, orderDetails, setOrderDetails} = useOutletContext();

  const isSecondScreen = (location.pathname.split("/").length - 1) > 3;
  
  return (
    <div className="h-full w-3/4 overflow-hidden">
        <div
            className={`w-full h-full transition-all duration-200 ${isSecondScreen ? "blur-sm" : ""}`}
        >
            <CategoryList />
        </div>
        {isSecondScreen && (
          <div className="h-food-top absolute w-3/4 inset-0 z-10 bg-transparent" />
        )}
        {isSecondScreen && (
            <div className="top-food-top absolute h-4/6 w-3/4 bg-white flex justify-center items-center">
                <Outlet  context={{ setOrders, orderDetails, setOrderDetails }} />
            </div>
        )}
    </div>
  );
};

export default CategoryLayout;
