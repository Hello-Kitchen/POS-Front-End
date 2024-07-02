import React from 'react';
import PropTypes from 'prop-types';

import FoodDetail from "../FoodDetail/FoodDetail";

function DetailList({details}) {

    console.log(details)
    const detailsList = details.map((elem) =>
        <FoodDetail key={elem.id} id={elem.id} name={elem.name} data={elem.data} multiple={elem.mutliple} />
    );
    return (
        <div className="h-full w-full row-span-5 overflow-auto scrollbar-hide">
            {detailsList}
        </div>
    )

}

DetailList.propTypes = {
    details: PropTypes.array.isRequired
}


export default DetailList;
