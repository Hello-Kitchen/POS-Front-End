import React from "react";

import PropTypes from "prop-types";

/**
 * Component : Component used to create a generic button inlined with the style of the POS application
 * 
 * @component GenericButton
 * @param {String} title displayed name of the button
 * @param {String} color background color of the button
 * @param {String} textColor color of the text displayed on the button
 * @param {Function} onClick function to be called when the button is clicked
 */
function GenericButton({title, color, textColor, onClick}){
    return (
        <div className={`flex justify-center bg-${color} font-bold text-2xl text-${textColor} p-3 rounded-lg`} onClick={onClick}>
            {title}
        </div>
    );
}

GenericButton.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

GenericButton.defaultProps = {
    title: "Button",
    color: "kitchen-blue",
    textColor: "white"
}

export default GenericButton;