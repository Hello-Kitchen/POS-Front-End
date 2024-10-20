import React from 'react';
import PropTypes from 'prop-types';

import FoodDetail from "../FoodDetail/FoodDetail";

/**
 * Component : Component used to displays all the details of the current food
 * 
 * @component DetailList
 * @param {[Object]} details Object Array of all details of the current food
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function DetailList({details, orderDetails, setOrderDetails}) {

    //map function to display all details of a food as a FoodDetail Component
    const detailsList = details.map((elem) =>
        <FoodDetail key={elem.id} name={elem.name} data={elem.data} multiple={elem.mutliple} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
    );
    return (
        <div className="h-full w-full row-span-5 overflow-auto scrollbar-hide">
            {detailsList}
        </div>
    )

}

DetailList.propTypes = {
    details: PropTypes.array.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired
}


export default DetailList;
