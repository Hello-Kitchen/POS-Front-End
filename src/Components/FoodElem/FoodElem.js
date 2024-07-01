import { useEffect, useState } from "react";

import FoodDetail from "./FoodDetail/FoodDetail";

function FoodElem({id, name, ingredients, details}) {

    const ingList = {}

    console.log(details)
    const detailsList = details.map((elem) =>
        <FoodDetail id={elem.id} name={elem.name} data={elem.data}/>
    );
    return (
        <div className="w-full h-5/6">
            {detailsList}
        </div>
    )

}

export default FoodElem;
