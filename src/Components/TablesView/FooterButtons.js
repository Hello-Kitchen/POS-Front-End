import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import CustomImage from "./CustomImage";

/**
 * FooterButton component renderinga generic table page footer button. It's given type changes the behaviour of the button.
 *
 * @param {string} url - the url of the button image from the public local storage.
 * @param {string} type - the type of the button (ex: "Fuse", "Sep", "Edit"...)
 * @param {string} activeButton - the current active button type of the footer. Only a signle button can be active.
 * @param {function} setActiveButton - use state function used to change the current active button.
 * @returns {JSX.Element} The rendered FooterButton component.
 */
export default function FooterButton({url, type, activeButton, setActiveButton}) {

    const [isActive, setIsActive] = useState(false);
    const [background, setBackground] = useState("bg-kitchen-blue")
    
    const updateActiveButton = () => {
        if (activeButton === type) {
            setActiveButton("None");
        } else {
            setActiveButton(type);
        }
    };

    //if the activeButton variable is updated, changes the state (boolean and background color) of all the buttons.
    useEffect(() => {
        if (activeButton === type) {
            setIsActive(true)
            setBackground("bg-kitchen-yellow")
        } else {
            setIsActive(false)
            setBackground("bg-kitchen-blue")
        }
    }, [type, activeButton, isActive]);

    return (
        <div id={type} className={`${background} flex-1 h-full w-full flex flex-col justify-center items-center col-span-1 shadow-button`}>
            <button onClick={() => updateActiveButton()} className="w-full h-full flex items-center justify-center">
                <CustomImage url={isActive ? `./icon-drag/active-${url}` : `./icon-drag/${url}`} />
            </button>
        </div>
    );
}

FooterButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  activeButton: PropTypes.string.isRequired,
  setActiveButton: PropTypes.func.isRequired
};