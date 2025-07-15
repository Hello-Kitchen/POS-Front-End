import React from "react";
import ManagerHeader from "./ManagerHeader";
import { StatViewKpiOneValue, StatViewKpiTwoValues } from "../../Components/Manager/StatsView/StatViewKpi";
import { DataGrid, ExportCsv, ExportPrint, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { IconButton, TextField, Tooltip } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaPrint, FaFileCsv } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import dayjs from "dayjs";

function TimeSinceUpdate({ lastUpdateTime }) {
    const [timeSinceUpdate, setTimeSinceUpdate] = React.useState("0s");

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (lastUpdateTime) {
                const now = new Date();
                const diffMs = now - new Date(lastUpdateTime);
                const seconds = Math.floor(diffMs / 1000);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                if (minutes > 0) {
                    setTimeSinceUpdate(`${minutes}m ${remainingSeconds}s`);
                } else {
                    setTimeSinceUpdate(`${remainingSeconds}s`);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastUpdateTime]);

    if (!lastUpdateTime) return null;
    const isStale = (new Date() - new Date(lastUpdateTime)) > 15000;

    return <h1 className="text-2xl font-bold">{isStale ? `Mis à jour il y a ${timeSinceUpdate}` : "En direct"}</h1>;
}

/**
 * StatsView component displays real-time KPI statistics and a data grid for the manager.
 *
 * Fetches KPI data from the backend and displays various statistics such as orders in progress,
 * clients count, average waiting time, and average preparation time for different time intervals.
 * Handles loading state and unauthorized access by redirecting to the login page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.onClickBack - Callback function to handle the back button click.
 * @returns {JSX.Element} The rendered StatsView component.
 */
function StatsView({ onClickBack }) {
    const navigate = useNavigate();
    const [kpiLoading, setKpiLoading] = React.useState(true);
    const [kpiData, setKpiData] = React.useState([]);
    const [revenuesData, setRevenuesData] = React.useState([]);
    const [revenuesLoading, setRevenuesLoading] = React.useState(true);
    const [choosenDate, setChosenDate] = React.useState(dayjs(new Date()).startOf('day'));
    const [lastUpdateTime, setLastUpdateTime] = React.useState(null);


    const fetchKpi = React.useCallback(() => {
        setKpiLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/kpi/displayKpi?useCase=POS`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(response => {
            if (response.status === 401) {
                navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                throw new Error("Unauthorized access. Please log in.");
            }
            return response.json();
        })
        .then(data => {
            setKpiData(data);
            setLastUpdateTime(new Date());
            setKpiLoading(false);
        })
        .catch(error => {
            console.error("Error fetching KPI data:", error);
        });
    }, [navigate]);
    
    const fetchRevenues = React.useCallback(() => {
        if (choosenDate !== null) {
            setRevenuesLoading(true);
            const convertedDate = choosenDate.format('YYYY-MM-DD');
            const convertedDateEnd = choosenDate.add(1, 'day').format('YYYY-MM-DD');
            fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/kpi/revenues?timeBegin=${convertedDate}&timeEnd=${convertedDateEnd}&breakdown=15&useCase=statsPOS`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                if (response.status === 401) {
                    navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                    throw new Error("Unauthorized access. Please log in.");
                }
                return response.json();
            })
            .then(data => {
                setRevenuesData(Object.keys(data).map((timeKey) => ({
                    id: timeKey,
                    time: timeKey,
                    revenues: data[timeKey].revenues,
                    ordersCount: data[timeKey].ordersCount,
                    averageWaitingTime: data[timeKey].averageWaitingTime.time
                })));
                setRevenuesLoading(false);
            })
            .catch(error => {
                console.error("Error fetching revenues data:", error);
            });
        }
    }, [navigate, choosenDate]);

    React.useEffect(() => {
        fetchKpi();
        fetchRevenues();
    }, [fetchKpi, fetchRevenues]);

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

    const columns = [
        { field: 'time', headerName: 'Tranche horaire', width: 150 },
        { field: 'revenues', headerName: 'Revenues', width: 150 },
        { field: 'ordersCount', headerName: 'Nbr de commandes', width: 150 },
        {
            field: 'averageWaitingTime',
            headerName: 'Tps d\'attente moyen',
            width: 200,
            valueGetter: (value) =>
            `${value.hours}h${value.minutes}m${value.seconds}s`
        }
    ];

    return (
        <div className="flex flex-col h-full w-full">
            <ManagerHeader title="Statistiques" onClick={onClickBack} />
            <div className="flex flex-col h-full w-full mb-5 px-3 pt-1">
                <div className="flex flex-row items-center">
                    <img src="./loading.gif" alt="Loading animation" className="w-5 h-5 mr-1" />
                    <TimeSinceUpdate lastUpdateTime={lastUpdateTime} />
                    <IconButton className="ml-auto" onClick={fetchKpi} disabled={kpiLoading}>
                        <Tooltip title="Rafraîchir les KPI">
                            <IoIosRefresh size={20} />
                        </Tooltip>
                    </IconButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatViewKpiOneValue title="Commandes en cours" value={kpiData.ordersInProgress} loading={kpiLoading}/>
                    <StatViewKpiOneValue title="Clients en cours" value={kpiData.clientsCount} loading={kpiLoading}/>
                    <StatViewKpiTwoValues
                        title ="Temps d'attente moyen" 
                        valueOne={kpiData.averageWaitingTime15m ? String(kpiData.averageWaitingTime15m.time.hours).padEnd(2, '0') + "h" + String(kpiData.averageWaitingTime15m.time.minutes).padEnd(2, '0') + "m" + String(kpiData.averageWaitingTime15m.time.seconds).padEnd(2, '0') + "s" : "00h 00m 00s"} 
                        valueTwo={kpiData.averageWaitingTime1h ? String(kpiData.averageWaitingTime1h.time.hours).padEnd(2, '0') + "h" + String(kpiData.averageWaitingTime1h.time.minutes).padEnd(2, '0') + "m" + String(kpiData.averageWaitingTime1h.time.seconds).padEnd(2, '0') + "s" : "00h 00m 00s"} 
                        descOne="15m" 
                        descTwo="1h" 
                        loadingOne={kpiLoading} 
                        loadingTwo={kpiLoading}
                    />
                    <StatViewKpiTwoValues
                        title ="Temps de préparation moyen" 
                        valueOne={kpiData.averagePrepTime15m ? String(kpiData.averagePrepTime15m.time.hours).padEnd(2, '0') + "h" + String(kpiData.averagePrepTime15m.time.minutes).padEnd(2, '0') + "m" + String(kpiData.averagePrepTime15m.time.seconds).padEnd(2, '0') + "s" : "00h 00m 00s"} 
                        valueTwo={kpiData.averagePrepTime1h ? String(kpiData.averagePrepTime1h.time.hours).padEnd(2, '0') + "h" + String(kpiData.averagePrepTime1h.time.minutes).padEnd(2, '0') + "m" + String(kpiData.averagePrepTime1h.time.seconds).padEnd(2, '0') + "s" : "00h 00m 00s"} 
                        descOne="15m" 
                        descTwo="1h" 
                        loadingOne={kpiLoading} 
                        loadingTwo={kpiLoading}
                    />
                </div>
            </div>
            <div className="flex flex-row" style={{ height: 'calc(100vh - 480px)' }}>
                <DataGrid
                    columns={columns}
                    rows={revenuesData}
                    loading={revenuesLoading}
                    getRowId={(row) => row.time}
                    hideFooterPagination
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    showToolbar
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
    );
}

TimeSinceUpdate.propTypes = {
    lastUpdateTime: PropTypes.string,
};

StatsView.propTypes = {
    onClickBack: PropTypes.func.isRequired,
};

export default StatsView;