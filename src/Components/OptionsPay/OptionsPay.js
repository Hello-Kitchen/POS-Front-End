import React from 'react';
import PropTypes from 'prop-types';

function Button({ button }) {
    return (
        <div className='flex border-none bg-kitchen-yellow text-2xl text-kitchen-blue font-bold rounded-3xl outline-none shadow-md justify-center items-center cursor-pointer text-center' onClick={button.func}>{button.name}</div>
    )
}

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