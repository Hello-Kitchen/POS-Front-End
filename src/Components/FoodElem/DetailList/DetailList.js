import React from 'react';
import PropTypes from 'prop-types';

import FoodDetail from "../FoodDetail/FoodDetail";

function DetailList({details}) {

    console.log(details)
    const detailsList = details.map((elem) =>
        <FoodDetail key={elem.id} id={elem.id} name={elem.name} data={elem.data}/>
    );
    return (
        <div className="w-full row-span-8">
            {detailsList}
        </div>
    )

}

DetailList.propTypes = {
    details: PropTypes.array.isRequired
}


export default DetailList;
