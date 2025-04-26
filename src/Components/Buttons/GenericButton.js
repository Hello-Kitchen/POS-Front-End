import React from "react";

import PropTypes from "prop-types";

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