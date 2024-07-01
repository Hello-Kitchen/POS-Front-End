import React from "react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryList() {

    const {id} = useParams();
    const [elems, setElems] = useState([]);

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/food?category=${id}`).then(response => {
        response.json().then(data => {
          setElems(data);
        });
      }).catch(error => {
        console.log(error);
      });
    }, [id]);

    const foods = elems.map((food) =>
        <h1 key={food.id}>{food.name}</h1>
    );

    return (
        <div>
            {foods}
        </div>
    )

}

export default CategoryList;