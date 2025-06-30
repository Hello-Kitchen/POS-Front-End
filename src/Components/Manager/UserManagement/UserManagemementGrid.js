import { Close, Delete } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useCallback, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Slide } from "@mui/material";
import PropTypes from 'prop-types';
import SideViewUser from "./SideViewUser";

async function loadUsers(navigate) {
    try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/users`, {
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
 * UserManagemementGrid component renders a user management grid with functionalities
 * to view, add, and delete users. It also includes a side view for user details or creation.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.setAlert - Function to set alert messages for success or error notifications.
 *
 * @returns {JSX.Element} The rendered UserManagemementGrid component.
 *
 * @example
 * <UserManagemementGrid setAlert={setAlertFunction} />
 *
 * @description
 * - Fetches user data on mount and displays it in a DataGrid.
 * - Allows adding a new user through a toolbar button.
 * - Provides actions for viewing user details and deleting users.
 * - Displays a side view for user details or creation when a user is selected.
 *
 * @dependencies
 * - React (useState, useEffect, useCallback)
 * - Material-UI components: DataGrid, GridToolbarContainer, GridActionsCellItem, Slide, IconButton
 * - Custom components: SideViewUser
 * - Utility functions: loadUsers
 *
 * @note
 * - Requires environment variables `REACT_APP_BACKEND_URL` and `REACT_APP_BACKEND_PORT` for API calls.
 * - Uses localStorage for authentication tokens and restaurant ID.
 */
function UserManagemementGrid({setAlert}) {
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [usersLoading, setUsersLoading] = React.useState(false);

    const fetchData = useCallback(() => {
        setUsersLoading(true);
      
        Promise.all([
            loadUsers(navigate),
        ]).then(([users]) => {
            setRows(users);
            setUsersLoading(false);
        }).catch((error) => {
          console.error(error);
          setAlert({type: 'error', message: 'Erreur lors du chargement des données'});
          setUsersLoading(false);
        });
      
      }, [navigate, setAlert]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const deleteUser = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/users/${id}`, {
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
            <Button onClick={() => {setSelectedUser({id: -1, username: '', firstname: '', lastname:'', password: ''});}}>
              Ajouter un utilisateur
            </Button>
          </GridToolbarContainer>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'username', headerName: 'Nom d\'utilisateur', width: 200 },
        { field: 'firstname', headerName: 'Prénom', width: 200 },
        { field: 'lastname', headerName: 'Nom', width: 200 },
        { field: 'actions', headerName: 'Actions', width: 100, type: 'actions', getActions: (params) => [
            <div key={params.row.id}>
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="Users"
                    onClick={() => setSelectedUser(params.row)}
                />
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => deleteUser(params.row.id)}
                />
            </div>
        ]},
    ]

    return (
        <div className="flex flex-row h-full w-full">
        <div className={selectedUser ? 'w-3/4' : 'w-full'} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="flex-1 min-h-0">
            <DataGrid
              columns={columns}
              rows={rows}
              loading={usersLoading}
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
        {selectedUser && (<Slide in={selectedUser ? true : false} direction="left">
          <div className="w-1/4 h-full pb-5 px-3">
            <div className="flex justify-between items-center">
            <p className="text-2xl">{selectedUser.name !== '' ? selectedUser.username : 'Nouvel utilisateur'}</p>
              <IconButton onClick={() => setSelectedUser(null)}>
                <Close/>
              </IconButton>
            </div>
            <SideViewUser
              user={selectedUser}
              setAlert={setAlert}
              refreshData={fetchData}
            />
          </div>
        </Slide>)}
      </div>
    );
}

UserManagemementGrid.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default UserManagemementGrid;