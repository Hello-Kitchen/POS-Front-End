import React from "react";
import PropTypes from "prop-types";

/**
 * CustomImage component renders an image given an url with custom size.
 *
 * @param {string} url - The url of the image from the local public storage.
 * @returns {JSX.Element} The rendered CustomImage component.
 */
const CustomImage = ({ url }) => {
    return (
        <svg viewBox="0 0 24 24" height="50" width="50" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={`imagePattern${url}`} patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href={url} x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <rect x="0" y="0" width="24" height="24" fill={`url(#imagePattern${url})`} />
        </svg>
    );
};

CustomImage.propTypes = {
    url: PropTypes.string.isRequired
}

export default CustomImage;
