import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import CustomImage from "./CustomImage";

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

    useEffect(() => {
        if (activeButton === type) {
            setIsActive(true)
            setBackground("bg-kitchen-yellow")
        } else {
            setIsActive(false)
            setBackground("bg-kitchen-blue")
        }
    }, [type, activeButton, isActive]);

    console.log(isActive ? `./icon-drag/active-${url}` : `./icon-drag/${url}`)

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