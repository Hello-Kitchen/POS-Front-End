function FoodFooter() {
    return (
        <div className="h-1/6 w-full row-span-2 grid grid-flow-col bottom-0">
            <button className="col-span-1 bg-kitchen-button-red">
                <h1 className="text-3xl font-bold text-white">Annuler</h1>
            </button>
            <button className="col-span-1 bg-kitchen-button-green">
                <h1 className="text-3xl font-bold text-white">Ajouter</h1>
            </button>
        </div>
    )
}

export default FoodFooter;
