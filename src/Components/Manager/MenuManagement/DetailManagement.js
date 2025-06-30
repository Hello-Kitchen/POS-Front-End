import { Close, Delete } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useCallback, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Slide } from "@mui/material";
import SideViewDetail from "./SideViewDetail";
import PropTypes from 'prop-types';

async function loadDetails(navigate) {
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

/**
 * Component for managing details in the menu management system.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setAlert - Function to set alert messages for the user.
 *
 * @returns {JSX.Element} The rendered DetailManagement component.
 *
 * @description
 * This component displays a data grid of details and allows users to perform actions such as:
 * - Viewing detail information.
 * - Adding a new detail.
 * - Deleting an existing detail.
 *
 * The component fetches data from the backend and handles loading states, errors, and user feedback.
 *
 * @example
 * <DetailManagement setAlert={(alert) => console.log(alert)} />
 */
function DetailManagement({setAlert}) {
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);
    const [selectedDetail, setSelectedDetail] = React.useState(null);
    const [detailsLoading, setDetailsLoading] = React.useState(false);

    const fetchData = useCallback(() => {
        setDetailsLoading(true);
      
        Promise.all([
            loadDetails(navigate),
        ]).then(([details]) => {
            setRows(details);
            setDetailsLoading(false);
        }).catch((error) => {
          console.error(error);
          setAlert({type: 'error', message: 'Erreur lors du chargement des données'});
          setDetailsLoading(false);
        });
      
      }, [navigate, setAlert]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const deleteDetail = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/details/${id}`, {
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
            <Button onClick={() => {setSelectedDetail({id: -1, name: '', multiple: false, data: [{type: 'text', name: ''}]});}}>
              Ajouter un detail
            </Button>
          </GridToolbarContainer>
        )
    }

    const columns = [
        { field: 'name', headerName: 'Nom', width: 300 },
        { field: 'multiple', headerName: 'Multiple', type: 'boolean', width: 100 },
        { field: 'actions', headerName: 'Actions', width: 100, type: 'actions', getActions: (params) => [
            <div key={params.row.id}>
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="Details"
                    onClick={() => setSelectedDetail(params.row)}
                />
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => deleteDetail(params.row.id)}
                />
            </div>
        ]},
    ]

    return (
        <div className="flex flex-row h-full w-full">
        <div className={selectedDetail ? 'w-3/4' : 'w-full'} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="flex-1 min-h-0">
            <DataGrid
              columns={columns}
              rows={rows}
              loading={detailsLoading}
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
        {selectedDetail && (<Slide in={selectedDetail} direction="left">
          <div className="w-1/4 h-full pb-5 px-3">
            <div className="flex justify-between items-center">
            <p className="text-2xl">{selectedDetail.name !== '' ? selectedDetail.name : 'Nouveau detail'}</p>
              <IconButton onClick={() => setSelectedDetail(null)}>
                <Close/>
              </IconButton>
            </div>
            <SideViewDetail
                selectedDetail={selectedDetail}
                setAlert={setAlert}
                refreshData={fetchData}
            />
          </div>
        </Slide>)}
      </div>
    );
}

DetailManagement.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default DetailManagement;