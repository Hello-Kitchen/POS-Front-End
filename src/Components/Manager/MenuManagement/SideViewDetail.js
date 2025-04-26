import { Add, Delete, SaveRounded } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * SideViewDetail Component
 *
 * This component is used to manage and edit the details of a menu item in a restaurant management system.
 * It allows users to update or create new details, including their name, type, and other properties.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.selectedDetail - The currently selected detail to be edited or viewed.
 * @param {Function} props.setAlert - Function to set alert messages for success or error notifications.
 * @param {Function} props.refreshData - Function to refresh the data after a successful operation.
 *
 * @returns {JSX.Element} The rendered SideViewDetail component.
 *
 * @example
 * <SideViewDetail
 *   selectedDetail={selectedDetail}
 *   setAlert={setAlert}
 *   refreshData={refreshData}
 * />
 */
function SideViewDetail({ selectedDetail, setAlert, refreshData }) {
  const [newDetail, setNewDetail] = React.useState(selectedDetail);
  const [sendLoading, setSendLoading] = React.useState(false);

  const sendDetail = () => {
    setSendLoading(true);
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}:${
        process.env.REACT_APP_BACKEND_PORT
      }/api/${localStorage.getItem("restaurantID")}/details/${
        newDetail.id === -1 ? "" : selectedDetail.id
      }`,
      {
        method: selectedDetail.id === -1 ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newDetail),
      }
    )
      .then((response) => {
        switch (response.status) {
          case 200:
            setAlert({
              type: "success",
              message: "Détail mis à jour avec succès",
            });
            refreshData();
            break;
          case 201:
            setAlert({ type: "success", message: "Détail ajouté avec succès" });
            refreshData();
            break;
          case 400:
            setAlert({
              type: "error",
              message: "Erreur lors de la mise à jour du détail",
            });
            break;
          case 401:
            setSendLoading(false);
            throw new Error("Unauthorized access. Please log in.");
          default:
            setAlert({ type: "error", message: "Erreur lors de l'opération" });
            break;
        }
        setSendLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSendLoading(false);
      });
  };

  useEffect(() => {
    setNewDetail(selectedDetail);
  }, [selectedDetail]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <Stack spacing={2} className="mb-4">
        <TextField
          value={newDetail.name}
          onChange={(e) => setNewDetail({ ...newDetail, name: e.target.value })}
          label="Nom"
          variant="standard"
        />
        <div className="flex flex-row">
          <p>Multiple: </p>
          <Switch
            checked={newDetail.multiple}
            onChange={(event) =>
              setNewDetail({ ...newDetail, multiple: event.target.checked })
            }
            size="small"
          />
        </div>
        {newDetail.data.map((detail, index) => (
            <div className="flex flex-col w-full" key={index}>
            {index !== 0 && <Divider />}
            <div className="flex flex-row w-full items-center mt-4">
              <div key={index} className="flex flex-col w-full">
                <Select
                  value={detail.type}
                  onChange={(event) => {
                    const updatedData = [...newDetail.data];
                    updatedData[index].type = event.target.value;
                    setNewDetail({ ...newDetail, data: updatedData });
                  }}
                >
                  <MenuItem value="text">Texte</MenuItem>
                  <MenuItem value="food" disabled>Plat</MenuItem>
                </Select>
                <TextField
                  value={detail.name}
                  onChange={(event) => {
                    const updatedData = [...newDetail.data];
                    updatedData[index].name = event.target.value;
                    setNewDetail({ ...newDetail, data: updatedData });
                  }}
                />
              </div>
              <div className="flex flex-col items-center">
                <IconButton
                  onClick={() => {
                    const updatedData = [...newDetail.data];
                    updatedData.push({ type: "text", name: "" });
                    setNewDetail({ ...newDetail, data: updatedData });
                  }}
                >
                  <Add />
                </IconButton>
                {index !== 0 && (
                  <IconButton
                    onClick={() => {
                      const updatedData = [...newDetail.data];
                      updatedData.splice(index, 1);
                      setNewDetail({ ...newDetail, data: updatedData });
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={sendDetail}
          endIcon={<SaveRounded />}
          variant="contained"
          style={{ backgroundColor: "#499CA6" }}
          loading={sendLoading}
        >
          Enregistrer
        </Button>
      </Stack>
    </div>
  );
}

SideViewDetail.propTypes = {
  selectedDetail: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default SideViewDetail;
