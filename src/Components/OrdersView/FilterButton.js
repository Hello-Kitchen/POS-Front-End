import React from "react";

import PropTypes from 'prop-types';

/**
 * FilterButton component renders a button with different styles based on its state.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} props.selected - Indicates if the button is selected.
 * @param {string} props.text - The text to display inside the button.
 * @returns {JSX.Element} The rendered FilterButton component.
 */
export default function FilterButton({onClick, selected, text}) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`${selected ? 
                `bg-kitchen-yellow text-kitchen-blue font-semibold border-kitchen-yellow` :
                 hovered ? 
                    `bg-kitchen-blue text-kitchen-yellow border-kitchen-blue` :
                    `bg-white border-kitchen-yellow`
                }
                border-2 rounded-xl px-3
                text-2xl md:text-sm 
                whitespace-nowrap`}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

FilterButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}