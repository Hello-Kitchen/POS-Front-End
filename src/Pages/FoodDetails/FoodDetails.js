import { useLocation } from "react-router-dom";

import FoodHeader from "../../Components/FoodElem/FoodHeader/FoodHeader";
import DetailList from "../../Components/FoodElem/DetailList/DetailList";
import ModifButton from "../../Components/FoodElem/ModifButton/ModifButton";
import FoodFooter from "../../Components/FoodElem/FoodFooter/FoodFooter";

function FoodDetails() {

    const location = useLocation();
    const {id, food} = location.state || {};

    if (food != null) {
      console.log(food.details)
      return (
        <div className="h-full w-3/4">
          <div className="h-5/6 w-full grid grid-flow-row p-2">
              <FoodHeader id={id} name={food.name} price={food.price} />
              <DetailList id={id} name={food.name} ingredients={food.ingredients} details={food.details}/>
              <ModifButton id={id} food={food}/>
          </div>
            <FoodFooter />
        </div>
      )
    }
}

export default FoodDetails;