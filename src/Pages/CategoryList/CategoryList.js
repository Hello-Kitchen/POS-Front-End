import { useParams } from "react-router-dom";

function CategoryList() {
    const params = useParams();
    return (
        <div>
            <h1> page des {params.name}</h1>
        </div>
    )

}

export default CategoryList;