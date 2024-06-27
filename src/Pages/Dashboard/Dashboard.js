import { useEffect, useState } from "react";

import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/api/food_category/").then(response => {
        response.json().then(data => {
          setCategories(data);
        });
      }).catch(error => {
        console.log(error);
      });
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
