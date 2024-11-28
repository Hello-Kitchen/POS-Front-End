import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component : Component handling and displaying all user input regarding ingredient choices and changes of the selected food
 * 
 * @component IngredientList
 * @param {[Object]} data Object Array of the ingredients of the current food
 * @param {Object} orderDetails Object used to persist detail and ingredient choices of a current food
 * @param {function} setOrderDetails state function to update the orderDetails object
 */
function NewIngredientList({data}) {

    // const [fullData, setFullData] = useState(data.map((elem => {
    //     return {
    //         id: elem.id,
    //         name: elem.name,
    //         color_green: 'bg-kitchen-food-ingredient-green',
    //         color_red: 'bg-kitchen-food-ingredient-red',
    //         add: false,
    //         del: false,
    //         all: false
    //     }
    // })));

    const handleClick = (event) => {
        let style = event.target.className
        if (style.includes("-selected")) {
            style = style.replace("-selected", "")
        } else {
            if (style.includes("green")) {
                style = style.replace("bg-kitchen-food-ingredient-green", "bg-kitchen-food-ingredient-green-selected")
            } else {
                style = style.replace("bg-kitchen-food-ingredient-red", "bg-kitchen-food-ingredient-red-selected")
            }
        }
        console.log(style)
        event.target.className = style
    }

    const choice = data.map((elem) =>
        <div key={elem.id} className={`${elem.color} w-full row-span-1 grid grid-flow-col grid-cols-12 colbottom-0 content-center pl-6 pr-6 mb-1`} >
            <div className='col-span-10'>
                <h1 className="text-3xl text-black float-left ml-4">
                    {elem.name}
                </h1>
            </div>
            <div className='w-full col-span-2 grid grid-flow-col grid-cols-5'>
                <button onClick={handleClick} className='text-3xl text-white border-4 border-kitchen-food-ingredient-green col-span-1 mr-1 rounded-full bg-kitchen-food-ingredient-green aspect-square w-full h-full'>
                    +
                </button>
                <button onClick={handleClick} className='text-3xl text-white border-4 border-kitchen-food-ingredient-red col-span-1 self-center ml-1 rounded-full bg-kitchen-food-ingredient-red w-full h-full aspect-square'>
                    -
                </button>
                <button onClick={handleClick} className='text-3xl text-white border-4 border-kitchen-food-ingredient-red justify-items-center col-span-3 self-center ml-2 rounded-full bg-kitchen-food-ingredient-red h-full'>
                    Allergie
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <div className="w-full grid grid-flow-row overflow-auto scrollbar-hide">
                {choice}
                <div className={`w-full row-span-1 grid grid-flow-col grid-cols-12 colbottom-0 content-center pl-6 pr-6`} >
                    <div className='col-span-10'>
                        <h1 className="text-3xl text-black float-left ml-4">
                            Note
                        </h1>
                    </div>
                    <div className='w-full col-span-2 grid grid-flow-col grid-cols-5'>
                        <button className='text-3xl border-4 border-kitchen-food-detail-selected text-white col-start-3 justify-items-center col-span-3 self-center mt-1 mb-1 ml-1 rounded-full bg-kitchen-food-detail-selected h-current-cmd-content'>
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

NewIngredientList.propTypes = {
    data: PropTypes.array.isRequired,
    orderDetails: PropTypes.object.isRequired,
    setOrderDetails: PropTypes.func.isRequired,
    buttonSelected: PropTypes.object.isRequired,
    setButtonSelected: PropTypes.func.isRequired
}


export default NewIngredientList;
