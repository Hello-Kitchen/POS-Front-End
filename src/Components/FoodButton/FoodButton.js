import { useNavigate } from "react-router-dom";

function FoodButton({id, name, color, food, route}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route + id, {state: {id: id, food: food}})
    }

    return (
        <div className="col-span-1">
            <button 
                className="h-full w-full"
                style={{ backgroundColor: color }}
                onClick={() => handleClick()}
                type="button"
            >
                <h1 className="text-3xl font-bold text-white">
                    {name}
                </h1>
            </button>
        </div>
    );
}

export default FoodButton;