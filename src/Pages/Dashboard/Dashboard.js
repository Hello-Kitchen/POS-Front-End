import { useEffect, useState } from "react";
import "./Dashboard.css";

import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      async function fetchData() {
        fetch("http://localhost:4000/api/food_category/").then(response => {
          response.json().then(data => {
            setCategories(data);
          });
        }).catch(error => {
          console.log(error);
        });
      } 
      fetchData();
    }, []);

    const buttons = categories.map((category) =>
        <CategoryButton key={category.id} id={category.id} name={category.name} color="red" route="category/"/>
    );


  return (
    <div className="Dashboard-block">
        {buttons}
    </div>
  );
}

export default Dashboard;
