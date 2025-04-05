import React from "react";

import { IoIosArrowBack } from "react-icons/io";

import PropTypes from "prop-types";

/**
 * A functional component that renders a header for the Manager page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to display in the header.
 * @param {Function} props.onClick - The callback function to handle click events on the header.
 * @returns {JSX.Element} The rendered ManagerHeader component.
 */
function ManagerHeader({title, onClick}) {
    return (
        <div className="flex items-center bg-kitchen-blue py-4 pl-1 space-x-1 border-t border-r h-16" onClick={onClick}>
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