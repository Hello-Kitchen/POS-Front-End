import CategoryButton from '../../Components/CategoryButton/CategoryButton';

function Dashboard() {
  return (
    <div>
      <CategoryButton name="Boisson" color="blue" route="category/"/>
      <CategoryButton name="Entrée" color="green" route="category/"/>
      <CategoryButton name="Plat" color="red" route="category/"/>
      <CategoryButton name="Dessert" color="yellow" route="category/"/>
    </div>
  );
}

export default Dashboard;
