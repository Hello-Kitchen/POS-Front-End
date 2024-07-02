function FoodHeader({id, name, price}) {

    return (
        <div className="w-full row-span-1 grid grid-flow-col colbottom-0 p-6 content-center border-b-2 border-b-black">
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

export default FoodHeader;
