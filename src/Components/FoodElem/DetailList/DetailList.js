import { useEffect, useState } from "react";

import FoodDetail from "../FoodDetail/FoodDetail";

function DetailList({id, name, details}) {

    console.log(details)
    const detailsList = details.map((elem) =>
        <FoodDetail id={elem.id} name={elem.name} data={elem.data}/>
    );
    return (
        <div className="w-full row-span-8">
            {detailsList}
        </div>
    )

}

export default DetailList;
