import { useLocation } from "react-router-dom";

import FoodButton from "../../Components/FoodButton/FoodButton";

function CategoryList() {

    const location = useLocation();
    const { id, food } = location.state || {};

    const foods = food.map((food) =>
      <FoodButton key={food.id}
          id={food.id}
          name={food.name}
          food={food}
          color="red" route={``}/>
    );

    return (
        <div className="h-full w-3/4 grid grid-cols-2 content-start gap-1">
            {foods}
        </div>
    )

}

export default CategoryList;