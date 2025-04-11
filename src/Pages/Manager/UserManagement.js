import React from "react";
import PropTypes from "prop-types";
import ManagerHeader from "./ManagerHeader";
import UserManagementGrid from "../../Components/Manager/UserManagement/UserManagemementGrid";
import { Alert, Snackbar } from "@mui/material";

function UserManagement ({onClickBack}) {
    const [alert, setAlert] = React.useState({type: '', message: ''});

    return (
        <div className="h-full w-full">
            <ManagerHeader title="Gestion des utilisateurs" onClick={onClickBack}/>
            <UserManagementGrid setAlert={setAlert}/>
            <Snackbar
                open={!!alert.type}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => setAlert({type: '', message: ''})}>
                <div className="flex align-center">
                    <Alert
                        severity={alert.type}
                        onClose={() => {
                            setAlert({type: '', message: ''});
                        }}
                        open={alert.type}
                    >
                        <p className="text-l">{alert.message}</p>
                    </Alert>
                </div>
            </Snackbar>
        </div>
    )
}
UserManagement.propTypes = {
    onClickBack: PropTypes.func.isRequired,
};

export default UserManagement;