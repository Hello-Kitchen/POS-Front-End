import { Add, Delete, SaveRounded } from "@mui/icons-material";
import { Autocomplete, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
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
    <div className="flex flex-col w-full h-full overflow-auto pb-10">
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
        <Typography variant="h6">Ingrédients</Typography>
        <div className="flex flex-col w-full space-y-3">
          {
            newFood.ingredients.map((ingredient, index) => {
              return (
                <div key={ingredient.id} className="flex flex-row w-full border-b-2 pb-5 ">
                  <div className="flex-1">
                    <Autocomplete
                      options={foodIngredients.filter(ing => newFood.ingredients.every(i => i.id_ingredient !== ing.id))}
                      getOptionLabel={(option) => option.name}
                      value={foodIngredients.find(ing => ing.id === ingredient.id_ingredient) || null}
                      onChange={(event, value) => {
                        setNewFood({...newFood, ingredients: newFood.ingredients.map(ing => ing.id_ingredient === ingredient.id_ingredient ? {...ing, id_ingredient: value ? value.id : -1} : ing)});
                      }}
                      renderInput={(params) => <TextField {...params} label="Ingrédient" variant="standard" />}
                    />
                    <TextField
                      value={ingredient.quantity}
                      onChange={(e) => setNewFood({...newFood, ingredients: newFood.ingredients.map(ing => ing.id_ingredient === ingredient.id_ingredient ? {...ing, quantity: Number(e.target.value)} : ing)})}
                      label="Quantité"
                      variant="standard"
                      type="number"
                    />
                    <TextField
                      value={ingredient.suppPrice}
                      onChange={(e) => setNewFood({...newFood, ingredients: newFood.ingredients.map(ing => ing.id_ingredient === ingredient.id_ingredient ? {...ing, suppPrice: Number(e.target.value)} : ing)})}
                      label="Prix supp"
                      variant="standard"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <IconButton color="primary" onClick={() => {
                      setNewFood({...newFood, ingredients: [...newFood.ingredients, {id_ingredient: -1, quantity: 0}]});
                    }}>
                        <Add />
                    </IconButton>
                    {index !== 0 && <IconButton onClick={() => {
                      setNewFood({...newFood, ingredients: newFood.ingredients.filter(ing => ing.id_ingredient !== ingredient.id_ingredient)});
                    }}>
                        <Delete/>
                    </IconButton>}
                  </div>
                </div>
              );
            })
          }
        </div>
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