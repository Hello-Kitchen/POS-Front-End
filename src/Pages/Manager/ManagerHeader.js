import React from "react";

import { IoIosArrowBack } from "react-icons/io";

import PropTypes from "prop-types";

function ManagerHeader({title, onClick}) {
    return (
        <div className="flex items-center bg-kitchen-blue py-4 pl-1 space-x-1 border-t border-r" onClick={onClick}>
            <IoIosArrowBack size={30} color="white"/>
            <p className="font-bold text-3xl text-white">{title}</p>
        </div>
    );
}

ManagerHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ManagerHeader;