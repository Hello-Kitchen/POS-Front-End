import {  Button, IconButton, Slide } from "@mui/material";
import { DataGrid,  GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Delete } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SideViewFood from "./SideViewFood";
import PropTypes from 'prop-types';

async function loadFoodCategory(navigate) {
  try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food_category`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 401) {
            navigate("/", { state: { error: "Unauthorized access. Please log in." } });
            throw new Error("Unauthorized access. Please log in.");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function loadFood(navigate) {
  try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 401) {
            navigate("/", { state: { error: "Unauthorized access. Please log in." } });
            throw new Error("Unauthorized access. Please log in.");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function loadFoodDetails(navigate) {
  try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 401) {
            navigate("/", { state: { error: "Unauthorized access. Please log in." } });
            throw new Error("Unauthorized access. Please log in.");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function loadIngredients(navigate) {
  try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/ingredient`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 401) {
            navigate("/", { state: { error: "Unauthorized access. Please log in." } });
            throw new Error("Unauthorized access. Please log in.");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * FoodManagement component for managing food items in a restaurant's menu.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setAlert - Function to set alert messages for the user.
 *
 * @description
 * This component displays a data grid of food items, allowing users to view, add, and delete food items.
 * It fetches data for food categories, food items, food details, and ingredients from the backend.
 * The component also includes a side view for editing or adding new food items.
 *
 * @returns {JSX.Element} The rendered FoodManagement component.
 */
function FoodManagement({setAlert}) {
  const navigate = useNavigate();

  const [foodLoading, setFoodLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [foodCategories, setFoodCategories] = React.useState([]);
  const [foodDetails, setFoodDetails] = React.useState([]);
  const [foodIngredients, setFoodIngredients] = React.useState([]);

  const [selectedFood, setSelectedFood] = React.useState();

  const fetchData = useCallback(() => {
    setFoodLoading(true);
  
    Promise.all([
      loadFoodCategory(navigate),
      loadFood(navigate),
      loadFoodDetails(navigate),
      loadIngredients(navigate),
    ]).then(([categories, foods, details, ingredients]) => {
      setFoodCategories(categories);
      setRows(foods);
      setFoodDetails(details);
      setFoodIngredients(ingredients);
      setFoodLoading(false);
    }).catch((error) => {
      console.error(error);
      setAlert({type: 'error', message: 'Erreur lors du chargement des données'});
      setFoodLoading(false);
    });
  
  }, [navigate, setAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteOrder = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/food/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(response => {
      if (response.status === 401) {
        navigate("/", {state: {error: "Unauthorized access. Please log in."}});
        throw new Error("Unauthorized access. Please log in.");
      } else if (response.status === 200) {
        setAlert({type: 'success', message: 'Elément supprimé avec succès'});
        fetchData();
      } else {
        setAlert({type: 'error', message: 'Erreur lors de la suppression de l\'élément'});
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function ToolBar() {
    return (
      <GridToolbarContainer>
        <Button onClick={() => {setSelectedFood({id: -1, name: '', price: '', id_category: '', details: [], ingredients: []});}}>
          Ajouter un plat
        </Button>
      </GridToolbarContainer>
    )
  }

  const columns = [
    { field: 'name', headerName: 'Nom', width: 300 },
    { field: 'price', headerName: 'Prix', width: 100 },
    { field: 'id_category', headerName: 'Catégorie', width: 180, valueGetter: (value, row) => {
        const category = foodCategories.find((category) => category.id === row.id_category);
        return category ? category.name : '';
      }
    },
    { field: 'actions', headerName: 'Actions', width: 100, type: 'actions', getActions: (params) => [
      <div key={params.row.id}>
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Details"
          onClick={() => setSelectedFood(params.row)}
        />
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteOrder(params.row.id)}
        />
      </div>
    ]},
  ]

  return (
    <div className="flex flex-row h-full w-full">
      <div className={selectedFood ? 'w-3/4' : 'w-full'} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="flex-1 min-h-0">
          <DataGrid
            columns={columns}
            rows={rows}
            loading={foodLoading}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: ToolBar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
              loadingOverlay: {
                variant: 'linear-progress',
                noRowsVariant: 'linear-progress',
              },
            }}
          />
        </div>
      </div>
      {selectedFood && (<Slide in={selectedFood} direction="left">
        <div className="w-1/4 h-full pb-5 px-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl">{selectedFood.name !== '' ? selectedFood.name : 'Nouveau plat'}</p>
            <IconButton onClick={() => setSelectedFood(null)}>
              <Close/>
            </IconButton>
          </div>
          <SideViewFood
            selectedFood={selectedFood}
            foodDetails={foodDetails}
            foodIngredients={foodIngredients}
            foodCategories={foodCategories}
            setAlert={setAlert}
            refreshData={fetchData}
          />
        </div>
      </Slide>)}
    </div>
  );
}

FoodManagement.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default FoodManagement;
