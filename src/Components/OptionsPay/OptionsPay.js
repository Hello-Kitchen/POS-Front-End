import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Generic button used by OptionsPay. Associates a name and a function to a button
 * 
 * @component Button
 * @param {Object} button object with a name and a function
 */
function Button({ button }) {
    return (
        <div className='flex border-none bg-kitchen-yellow text-2xl text-kitchen-blue font-bold rounded-3xl outline-none shadow-md justify-center items-center cursor-pointer text-center' onClick={button.func}>{button.name}</div>
    )
}

/**
 * Component : Displays pay options buttons
 * 
 * @component OptionsPay
 * @param {[Object]} buttons array of objects with a name and a function
 */
function OptionsPay ({ buttons }) {
    return (
        <div className='w-full h-1/2 grid grid-cols-4 grid-rows-5 gap-2.5 p-2'>
            {
                buttons.map((button, i) => {
                    return <Button key={i} button={button} />
                })
            }
        </div>
    )
}

OptionsPay.propTypes = {
    buttons: PropTypes.array.isRequired,
}

Button.propTypes = {
    button: PropTypes.object.isRequired,
}

export default OptionsPay;