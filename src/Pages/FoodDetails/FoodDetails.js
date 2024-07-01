import FoodElem from "../../Components/FoodElem/FoodElem";
import { useLocation } from "react-router-dom";

function FoodDetails() {

    const location = useLocation();
    const {id, food} = location.state || {};
    

    if (food != null) {
      console.log(food.details)
      return ( 
        <div className="h-full w-3/4">
            <FoodElem id={id} name={food.name} ingredients={food.ingredients} details={food.details}/>
            <div className="w-full h-1/6 grid grid-flow-col bottom-0">
                <button className="col-span-1 bg-kitchen-button-red">
                  <h1 className="text-3xl font-bold text-white">Annuler</h1>
                </button>
                <button className="col-span-1 bg-kitchen-button-green">
                <h1 className="text-3xl font-bold text-white">Ajouter</h1>
                </button>
            </div>
        </div>
      )
    }
}

export default FoodDetails;