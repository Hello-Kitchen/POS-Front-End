import React from 'react';
import PropTypes from 'prop-types';

function FoodHeader({name, price}) {

    return (
        <div className="h-1/6 w-full grid grid-flow-col colbottom-0 p-6 content-center border-b-2 border-b-black">
            <div className="w-full col-span-5 justify-items-center flex-row content-center">
                <h1 className="text-3xl font-bold text-black">
                    {name}
                </h1>
            </div>
            <div className="col-span-1 w-full grid justify-items-end float-right">
                <h1 className="text-3xl font-bold text-black">
                    {price}€
                </h1>
            </div>
        </div>
    )
}

FoodHeader.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}


export default FoodHeader;
