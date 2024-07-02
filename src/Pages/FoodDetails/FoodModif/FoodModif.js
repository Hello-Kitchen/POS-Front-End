import { useLocation } from "react-router-dom";

import FoodHeader from "../../../Components/FoodElem/FoodHeader/FoodHeader";
import IngredientsButton from "../../../Components/FoodElem/IngredientsButton/IngredientsButton";
import ModifButton from "../../../Components/FoodElem/FoodHeader/FoodHeader";
import IngredientList from "../../../Components/FoodElem/Ingredientlist/IngredientList";
import FoodFooter from "../../../Components/FoodElem/FoodFooter/FoodFooter";

function FoodModif() {

    const location = useLocation();
    const {id, food} = location.state || {};
    

    return ( 
        <div className="h-full w-3/4">
          <div className="h-5/6 w-full grid grid-flow-row p-2">
              <FoodHeader id={id} name={food.name} price={food.price} />
              <IngredientsButton />
              <IngredientList id={id} data={food.ingredients} />
          </div>
            <FoodFooter />
        </div>
    )
}

export default FoodModif;