import React from 'react';
import PropTypes from 'prop-types';

function handleClick (event) {
    let elements = document.getElementsByClassName("mods-pay");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("border-2")
        elements[i].classList.remove("border-kitchen-blue")
        elements[i].classList.remove("select-mod")
    }
    event.currentTarget.classList.add('border-2')
    event.currentTarget.classList.add('border-kitchen-blue')
    event.currentTarget.classList.add('select-mod')
    let equal = document.getElementById('=');
    equal.innerHTML = "Entrée"
}

/**
 * Component : Button Component used by the ModsPay component
 * 
 * @component Button
 * @param {Object} button object with all relevant information of the current mod button
 * @param {Number} id id of the current button
 * @param {Function} setPayList state function to update the payList
 * @param {Number} priceLess full price of the current order
 * @param {[]} payList 
 * @param {Function} setPriceLess state function to update full price of the current order
 */
function Button({ button, id, setPayList, priceLess, payList, setPriceLess }) {
    return (
        <div id={id} className='flex w-full h-1/4 bg-kitchen-yellow rounded-3xl text-kitchen-blue justify-center items-center font-bold shadow-md text-2xl font-bold cursor-pointer mods-pay' onClick={(event) => { handleClick(event); if (event.currentTarget.id === "CB Total" && priceLess > 0) { const newDiv = <div key={payList.length} className='flex flex-row justify-between w-full'><div className='text-white font-normal text-20px'>{event.currentTarget.id}</div><div className='text-white font-normal text-20px'>{Number(priceLess).toFixed(2)}€</div></div>; setPayList([...payList, newDiv]); setPriceLess(0) } }} >{button}</div>
    )
}

/**
 * Component : Displays all pay methods button
 * 
 * @component ModsPay
 * @param {[Object]} buttons array of object with all mods buttons informations
 * @param {Function} setPayList state function to update the payList
 * @param {Number} priceLess full price of the current order
 * @param {[]} payList 
 * @param {Function} setPriceLess state function to update full price of the current order
 */
function ModsPay({ buttons, setPayList, priceLess, payList, setPriceLess }) {
    return (
        <div className='h-full w-1/2 p-2 flex flex-col gap-3'>
            {
                buttons.map((button, i) => {
                    return (
                        <Button key={i} button={button} id={button} setPayList={setPayList} priceLess={priceLess} payList={payList} setPriceLess={setPriceLess} ></Button>
                    )
                })
            }
        </div>
    )
}

ModsPay.propTypes = {
    buttons: PropTypes.array.isRequired,
    setPayList: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
    setPriceLess: PropTypes.func.isRequired,
}

Button.propTypes = {
    button: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setPayList: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
    setPriceLess: PropTypes.func.isRequired,
}

export default ModsPay;