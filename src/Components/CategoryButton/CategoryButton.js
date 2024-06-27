import "./CategoryButton.css";
import { useNavigate } from "react-router-dom";

function CategoryButton({name, color, route}) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("Going to " + name)
        navigate(route + name, {name: name})
    }
    return (
        <div>
            <button 
                className="Catergory-button"
                style={{ backgroundColor: color }}
                onClick={() => handleClick()}
                type="button"
            >
                <text
                    className="Catergory-text"
                >
                {name}
                </text>
            </button>
        </div>
    );
}

export default CategoryButton;