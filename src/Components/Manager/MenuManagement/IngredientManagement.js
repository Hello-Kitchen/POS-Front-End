import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridRowModes,
  Toolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

async function loadIngredients(navigate) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/ingredient`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 401) {
      navigate("/", {
        state: { error: "Unauthorized access. Please log in." },
      });
      throw new Error("Unauthorized access. Please log in.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function EditToolbar(props) {
  // eslint-disable-next-line react/prop-types
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const newRow = { id: -1, name: "", price: 0, quantity: 0, unit: "" };
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [-1]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <Toolbar>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter un ingredient
      </Button>
    </Toolbar>
  );
}

/**
 * Component for managing ingredients in a menu management system.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setAlert - Function to set alert messages for success or error notifications.
 *
 * @returns {JSX.Element} The IngredientManagement component.
 *
 * @description
 * This component provides a user interface for managing ingredients, including adding, editing, and deleting ingredients.
 * It uses a data grid to display the list of ingredients and allows inline editing of rows. The component interacts with
 * a backend API to fetch, update, and delete ingredient data.
 *
 * @example
 * <IngredientManagement setAlert={setAlertFunction} />
 *
 * @dependencies
 * - React
 * - @mui/x-data-grid
 * - useNavigate (from react-router-dom)
 *
 * @functions
 * - fetchData: Fetches ingredient data from the backend API.
 * - handleRowEditStop: Handles the stop event of row editing.
 * - handleEditClick: Enables edit mode for a specific row.
 * - handleSaveClick: Saves changes made to a specific row.
 * - handleDeleteClick: Deletes a specific row from the backend and updates the UI.
 * - handleCancelClick: Cancels editing for a specific row.
 * - processRowUpdate: Processes updates to a row and sends them to the backend API.
 * - handleRowModesModelChange: Updates the row modes model state.
 *
 * @columns
 * - name: The name of the ingredient (editable).
 * - price: The price of the ingredient (editable, numeric).
 * - quantity: The quantity of the ingredient (editable, numeric).
 * - unit: The unit of measurement for the ingredient (editable).
 * - actions: Action buttons for editing, saving, canceling, and deleting rows.
 */
function IngredientManagement({ setAlert }) {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const fetchData = useCallback(() => {
    loadIngredients(navigate)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: "Erreur lors du chargement des données",
        });
        console.error(error);
      });
  }, [navigate, setAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleDeleteClick = (id) => () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/ingredient/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          navigate("/", { state: { error: "Unauthorized access. Please log in." } });
          throw new Error("Unauthorized access. Please log in.");
        } else if (response.status === 200) {
          setAlert({ type: "success", message: "Elément supprimé avec succès" });
          fetchData();
        } else {
          setAlert({ type: "error", message: "Erreur lors de la suppression de l'élément" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setRows((oldRows) => oldRows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
    if (id === -1) {
      setRows((oldRows) => oldRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/ingredient/${
        newRow.id === -1 ? "" : newRow.id
      }`;
      const method = newRow.id === -1 ? "POST" : "PUT";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newRow),
      });
      switch (response.status) {
        case 200:
          setAlert({ type: "success", message: "Ingredient mis à jour avec succès" });
          break;
        case 201:
          setAlert({ type: "success", message: "Ingredient ajouté avec succès" });
          break;
        case 400:
          setAlert({ type: "error", message: "Erreur lors de la mise à jour du détail" });
          break;
        case 401:
          throw new Error("Unauthorized access. Please log in.");
        default:
          setAlert({ type: "error", message: "Erreur lors de l'opération" });
          break;
      }
      // On met à jour localement (ici vous pouvez remplacer newRow.id si l'API renvoie un nouvel id)
      fetchData();
      return newRow;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleRowModesModelChange = (newModel) => {
    setRowModesModel(newModel);
  };

  const columns = [
    { field: "name", headerName: "Nom", width: 300, editable: true },
    {
      field: "price",
      headerName: "Prix",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantité",
      type: "number",
      width: 100,
      editable: true,
    },
    { field: "unit", headerName: "Unité", width: 100, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <div key={id}>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Sauvegarder"
                onClick={handleSaveClick(id)}
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Annuler"
                onClick={handleCancelClick(id)}
              />
            </div>
          ];
        }
        return [
          <div key={id}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Éditer"
              onClick={handleEditClick(id)}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Supprimer"
              onClick={handleDeleteClick(id)}
            />
          </div>
        ];
      },
    },
  ];

  return (
    <div className="flex flex-row" style={{ height: 'calc(100vh - 309px)' }}> 
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error(error);
        }}
        showToolbar
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        onRowDoubleClick={(params) =>
          setRowModesModel((oldModel) => ({
            ...oldModel,
            [params.id]: { mode: GridRowModes.Edit },
          }))
        }
      />
    </div>
  );
}

IngredientManagement.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default IngredientManagement;
