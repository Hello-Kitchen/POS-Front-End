import React from 'react';

import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
    const data = localStorage.getItem("data");

    const buttons = JSON.parse(data).map((elem) =>
      <CategoryButton key={elem.id} id={elem.id} name={elem.name} food={elem.food} color="red" route="category/"/>
  );


  return (
    <div className="h-full w-3/4 grid grid-cols-2 content-start gap-1">
        {buttons}
    </div>
  );
}

export default Dashboard;
