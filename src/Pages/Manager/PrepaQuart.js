import React from "react";
import ManagerHeader from "./ManagerHeader";

import PropTypes from "prop-types";
import PrepaQuartGrid from "../../Components/Manager/PrepaQuart/PrepaQuartGrid";

function PrepaQuart({onClickBack}){    
    return (
        <div className="h-full w-full flex flex-col">
            <ManagerHeader title={'Prépa Quart'} onClick={() => onClickBack()}/>
            <PrepaQuartGrid />
        </div>
    );
}

PrepaQuart.propTypes = {
    onClickBack: PropTypes.func.isRequired
}

export default PrepaQuart;