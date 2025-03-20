import React from "react";
import ManagerHeader from "./ManagerHeader";

import PropTypes from "prop-types";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";

function AccountManagement({onClickBack}){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    
    return (
        <div>
            <ManagerHeader title={'Gestion du compte'} onClick={() => onClickBack()}/>
            <div className="m-3 space-y-1">
                <p className="text-4xl font-bold">{userInfo.firstname} {userInfo.lastname}</p>
                <p className="text-xl font-medium">Restaurant {localStorage.getItem("restaurantID")} - Employé {userInfo.id}</p>
                <GenericButton title="Déconnexion" color="kitchen-yellow" textColor="kitchen-blue" onClick={() => {localStorage.removeItem('token');navigate("/");}}/>
            </div>
        </div>
    );
}

AccountManagement.propTypes = {
    onClickBack: PropTypes.func.isRequired
}

export default AccountManagement;