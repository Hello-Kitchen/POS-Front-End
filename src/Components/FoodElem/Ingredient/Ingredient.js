function FoodIngredient({name, data}) {

    console.log(data)
    const choice = data.map((elem) =>
        <div className="bg-kitchen-food-detail">
            <button>
                <h1 className="text-3xl font-bold text-white">
                    {elem}
                </h1>
            </button>
        </div>
    );

    return (
        <div className="h-full w-full">
            <h1 className="text-3xl font-bold text-black">{name}</h1>
            <div className="h-full w-full grid grid-cols-4 content-start">
                {choice}
            </div>
        </div>
    )
}

export default FoodIngredient;
