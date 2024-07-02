import { GoArrowUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function ModifButton({id, food}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("modification", {state: {food: food}})
    }

    return (
        <div className="w-full row-span-1 grid grid-flow-col colbottom-0 p-6 content-center border-t-2 border-t-black">
            <div className="w-full col-span-5 justify-items-center flex-row content-center">
                <h1 className="text-3xl font-bold text-black">
                    Modifications
                </h1>
            </div>
            <div className="col-span-1 w-full grid justify-items-end float-right">
                <button onClick={() => handleClick()}>
                    <GoArrowUp size={40} color="black" />
                </button>
            </div>
        </div>
    )
}

export default ModifButton;
