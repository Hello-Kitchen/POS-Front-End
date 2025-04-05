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
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

async function loadIngredients(navigate) {
  try {
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/food_category`,
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
    const newRow = { id: -1, name: "" };
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [-1]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter une catégorie
      </Button>
    </GridToolbarContainer>
  );
}

/**
 * Component for managing food categories in a restaurant's menu.
 * Provides functionality to view, edit, add, and delete food categories
 * using a data grid interface.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.setAlert - Function to display alert messages.
 *
 * @returns {JSX.Element} The FoodCategoryManagement component.
 *
 * @example
 * <FoodCategoryManagement setAlert={setAlertFunction} />
 *
 * @description
 * This component uses the Material-UI DataGrid to display a list of food categories.
 * It supports the following features:
 * - Fetching data from the backend API.
 * - Editing rows inline with save and cancel options.
 * - Adding new rows.
 * - Deleting rows.
 * - Displaying success or error alerts based on API responses.
 *
 * @dependencies
 * - React
 * - Material-UI DataGrid
 * - React Router's `useNavigate` hook
 *
 * @notes
 * - The component relies on environment variables for API configuration:
 *   - `REACT_APP_BACKEND_URL`
 *   - `REACT_APP_BACKEND_PORT`
 * - The `restaurantID` and `token` are retrieved from `localStorage`.
 * - Ensure proper error handling and user authentication for secure API access.
 */
function FoodCategoryManagement({ setAlert }) {
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
      `http://${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/food_category/${id}`,
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
      const url = `http://${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/food_category/${
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
          setAlert({ type: "success", message: "Catégorie mis à jour avec succès" });
          break;
        case 201:
          setAlert({ type: "success", message: "Catégorie ajouté avec succès" });
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
    <div className="flex flex-col h-full w-full">
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

FoodCategoryManagement.propTypes = {
  setAlert: PropTypes.func.isRequired,
};



export default FoodCategoryManagement;
