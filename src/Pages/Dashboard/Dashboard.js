import React from 'react';

import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
    const data = localStorage.getItem("data");

    const colors = [
      "bg-category-red",
      "bg-category-purple",
      "bg-category-orange",
      "bg-category-green",
      "bg-category-blue",
      "bg-category-cyan"
    ]
    const buttons = JSON.parse(data).map((elem) =>
      <CategoryButton key={elem.id} id={elem.id} name={elem.name} food={elem.food} color={colors[elem.id] != null ? colors[elem.id] : colors[0]} route="category/"/>
  );


  return (
    <div className="h-full w-3/4 grid grid-cols-2 grid-rows-8 content-start">
        {buttons}
    </div>
  );
}

export default Dashboard;
