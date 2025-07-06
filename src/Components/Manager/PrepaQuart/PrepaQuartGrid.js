import React from "react";
import dayjs from 'dayjs';
import { DataGrid, ExportCsv, ExportPrint, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import { TextField, Tooltip } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaPrint, FaFileCsv } from "react-icons/fa";

function PrepaQuartGrid() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [choosenDate, setChosenDate] = React.useState(dayjs(new Date()).startOf('day'));

    const fetchData = React.useCallback(() => {
        if (choosenDate !== null) {
            setLoading(true);
            const convertedDate = choosenDate.format('YYYY-MM-DD');
            fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/kpi/ingredientForecast?useCase=POS&date=${convertedDate}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                if (response.status === 401) {
                    throw new Error("Unauthorized access. Please log in.");
                } else if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Error fetching data');
                }
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [choosenDate]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columns = [
        { field: 'name', headerName: 'Ingrédient', width: 200 },
        { field: 'quantity', headerName: 'Quantité', width: 100 },
        { field: 'unit', headerName: 'Unité', width: 200 },
    ]

    function CustomToolbar() {
        return (
            <Toolbar>
                <DatePicker
                    value={choosenDate}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => {
                        setChosenDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Tooltip title="Download as CSV">
                    <ExportCsv render={<ToolbarButton />}>
                        <FaFileCsv/>
                    </ExportCsv>
                </Tooltip>
                <Tooltip title="Print">
                    <ExportPrint render={<ToolbarButton />}>
                        <FaPrint/>
                    </ExportPrint>
                </Tooltip>
            </Toolbar>
        )
    }

    return (
        <div className="h-full w-full flex">
            <DataGrid
                columns={columns}
                rows={data}
                loading={loading}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                getRowId={(row) => row.id}
                slots={{ toolbar: CustomToolbar }}
                showToolbar
                slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress',
                    },
                }}
            />
        </div>
    );
}

export default PrepaQuartGrid;