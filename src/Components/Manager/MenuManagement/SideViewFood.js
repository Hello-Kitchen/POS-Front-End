import { SaveRounded } from "@mui/icons-material";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * SideViewFood Component
 * 
 * This component is used to manage the details of a selected food item. It allows users to edit
 * the food's name, price, category, details, and ingredients, and save the changes to the backend.
 * 
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.selectedFood - The currently selected food item.
 * @param {Array} props.foodDetails - The list of available food details.
 * @param {Array} props.foodIngredients - The list of available food ingredients.
 * @param {Array} props.foodCategories - The list of available food categories.
 * @param {Function} props.setAlert - Function to set alert messages for user feedback.
 * @param {Function} props.refreshData - Function to refresh the data after an operation.
 * 
 * @returns {JSX.Element} The rendered SideViewFood component.
 */
function SideViewFood({selectedFood, foodDetails, foodIngredients, foodCategories, setAlert, refreshData}) {
  const navigate = useNavigate();

  const [newFood, setNewFood] = React.useState(selectedFood);
  const [sendLoading, setSendLoading] = React.useState(false);

  useEffect(() => {
    setNewFood(selectedFood);
  }
  , [selectedFood]);

  const sendFood = () => {
    setSendLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food/${newFood.id === -1 ? '' : selectedFood.id}`, {
      method: newFood.id === -1 ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newFood),
    })
    .then((response) => {
      switch (response.status) {
        case 200:
          setAlert({type: "success", message: "Plat mis à jour avec succès"});
          refreshData();
          break;
        case 201:
          setAlert({type: "success", message: "Plat ajouté avec succès"});
          refreshData();
          break;
        case 400:
          setAlert({type: "error", message: "Erreur lors de la mise à jour du plat"});
          break;
        case 401:
          setSendLoading(false);
          navigate("/", {state: {error: "Unauthorized access. Please log in."}});
          throw new Error("Unauthorized access. Please log in.");
        default:
          setAlert({type: "error", message: "Erreur lors de l'opération"});
          break;
      }
      setSendLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setSendLoading(false);
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Stack spacing={2} className="mb-4">
        <TextField
          value={newFood.name}
          onChange={(e) => setNewFood({...newFood, name: e.target.value})}
          label="Nom"
          variant="standard"
        />
        <TextField
          value={newFood.price}
          onChange={(e) => setNewFood({...newFood, price: Number(e.target.value)})}
          type='number'
          label="Prix"
          variant="standard"
        />
        <Autocomplete
          options={foodCategories}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setNewFood({...newFood, id_category: value.id})}
          value={foodCategories.find((category) => category.id === selectedFood.id_category)}
          renderInput={(params) => <TextField {...params} label="Catégorie" variant="standard" />}
        />
        <Autocomplete
          multiple
          options={foodDetails}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setNewFood({...newFood, details: value.map((detail) => detail.id)})}
          value={foodDetails.filter((detail) => newFood.details.includes(detail.id))}
          renderInput={(params) => <TextField {...params} label="Détails" variant="standard" />}
        />
        <Autocomplete
          multiple
          options={foodIngredients}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setNewFood({...newFood, ingredients: value.map((ingredient) => ingredient.id)})}
          value={foodIngredients.filter((ingredient) => newFood.ingredients.includes(ingredient.id))}
          renderInput={(params) => <TextField {...params} label="Ingrédients" variant="standard" />}
        />
        <Button
          onClick={sendFood}
          endIcon={<SaveRounded/>}
          variant="contained"
          style={{backgroundColor: "#499CA6"}}
          loading={sendLoading}
        >
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
}

SideViewFood.propTypes = {
  selectedFood: PropTypes.object.isRequired,
  foodDetails: PropTypes.array.isRequired,
  foodIngredients: PropTypes.array.isRequired,
  foodCategories: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default SideViewFood;