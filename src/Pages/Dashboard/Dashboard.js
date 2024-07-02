import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const { setPriceLess, price, setPayList } = useOutletContext();

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/food_category/`).then(response => {
        response.json().then(data => {
          setCategories(data);
        });
      }).catch(error => {
        console.log(error);
      });
      setPriceLess(price);
      setPayList([]);
    }, []);

    const buttons = categories.map((category) =>
        <CategoryButton key={category.id} id={category.id} name={category.name} color="red" route="category/"/>
    );


  return (
    <div className="h-full w-3/4 grid grid-cols-2 content-start gap-1">
        {buttons}
    </div>
  );
}

export default Dashboard;
