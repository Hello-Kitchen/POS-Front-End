import React from 'react';
import PropTypes from 'prop-types';

// const ButtonTables = () => (
//     <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
//         <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <pattern id="imageTables" patternUnits="userSpaceOnUse" width="24" height="24">
//                     <image href="/lampe.jpg" x="0" y="0" width="24" height="24" />
//                 </pattern>
//             </defs>
//             <circle r="10" cx="12" cy="12" fill="url(#imageTables)" />
//         </svg>
//         <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>TABLES</div>
//     </div>
// );

// const ButtonCommandes = () => (
//     <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
//         <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <pattern id="imageCommandes" patternUnits="userSpaceOnUse" width="24" height="24">
//                     <image href="/book.jpg" x="0" y="0" width="24" height="24" />
//                 </pattern>
//             </defs>
//             <circle r="10" cx="12" cy="12" fill="url(#imageCommandes)" />
//         </svg>
//         <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>COMMANDES</div>
//     </div>
// );

// const ButtonTransactions = () => (
//     <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
//         <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <pattern id="imageTransactions" patternUnits="userSpaceOnUse" width="24" height="24">
//                     <image href="/ticket.jpg" x="0" y="0" width="24" height="24" />
//                 </pattern>
//             </defs>
//             <circle r="10" cx="12" cy="12" fill="url(#imageTransactions)" />
//         </svg>
//         <div className='text-24px font-bold text-white flex justify-center items-center truncate w-full'>TRANSACTIONS</div>
//     </div>
// );

// const ButtonManager = () => (
//     <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
//         <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//                 <pattern id="imageManager" patternUnits="userSpaceOnUse" width="24" height="24">
//                     <image href="/sac.jpg" x="0" y="0" width="24" height="24" />
//                 </pattern>
//             </defs>
//             <circle r="10" cx="12" cy="12" fill="url(#imageManager)" />
//         </svg>
//         <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>MANAGER</div>
//     </div>
// );

// const buttonComponents = {
//     tables: ButtonTables,
//     commandes: ButtonCommandes,
//     transactions: ButtonTransactions,
//     manager: ButtonManager,
// };

// export default buttonComponents;

/**
 * @brief Renders a custom image inside a circle.
 *
 * This component takes a URL and uses it as a pattern inside an SVG circle.
 *
 * @param {Object} props Component properties.
 * @param {string} props.url The URL of the image to be displayed.
 *
 * @return {JSX.Element} An SVG circle element with the image as a background.
 */
const CustomImage = ({ url }) => {
    return (
        <svg viewBox="0 0 24 24" height="50" width="50" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={`imagePattern${url}`} patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href={url} x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill={`url(#imagePattern${url})`} />
        </svg>
    );
};

CustomImage.propTypes = {
    url: PropTypes.string.isRequired
};

/**
 * @brief Renders a generic button with an icon and a label.
 *
 * This component renders a button that can display either a predefined icon or a custom image.
 * An optional `onClick` function can be passed to handle button interactions.
 *
 * @param {Object} props Component properties.
 * @param {string} props.icon Icon type, can be a predefined icon name (e.g., 'checkmark') or 'null' to render a custom image.
 * @param {string} props.label Label to display below the icon.
 * @param {string} [props.imageUrl] Optional URL for the custom image (used when icon is 'null').
 * @param {function} [props.setConfig] Optional function to toggle configuration (passed for specific buttons like 'activer').
 * @param {string} props.activeTab The currently active tab.
 * @param {function} props.updateActiveTab Function to update the active tab.
 * @param {boolean} props.invertOnClick Whether to invert the color on button click.
 * @param {function} props.navigationPrev - A function to navigate to the prev order.
 * @param {function} props.navigationAfter - A function to navigate to the next order.
 *
 * @return {JSX.Element} A button component with an icon or image and a label.
 */
const GenericButton = ({
    label,
    imageUrl,
    activeTab,
    updateActiveTab,
    onClickFunction,
}) => {
    const handleClick = () => {
        activeTab === label ? updateActiveTab("") : updateActiveTab(label);
        if (onClickFunction)
            onClickFunction();
    };

    const isActive = activeTab === label;
    return (
        label === "" ? (
            <div className="flex-1 bg-kitchen-blue select-none"></div>
        ) : (
            <div
                className={`flex-1 p-0.5 flex flex-col justify-center items-center border-r-[1px] border-l-[1px] border-kitchen-yellow cursor-pointer select-none
                    ${isActive ? 'bg-kitchen-yellow text-kitchen-blue shadow-inner-top-lg' : 'bg-kitchen-blue text-white'}
                `}
                onClick={handleClick}
            >
                <CustomImage url={!isActive ? `./active-${imageUrl}` : `./${imageUrl}`} />
                <div className={`text-lg sm:text-3xl font-bold ${isActive ? 'text-kitchen-blue' : 'text-white'}`}>
                    {label}
                </div>
            </div>
        )
    );
};

GenericButton.propTypes = {
    label: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onClickFunction: PropTypes.func
};

/**
 * @brief Defines the button data, including icon, label, and any custom behavior.
 *
 * The data is used to generate buttons dynamically with varying configurations.
 * Each button is identified by a unique key.
 */
let buttonData = {
    tables: { imageUrl: 'lampe.jpg', label: 'TABLES'},
    commandes: { imageUrl: 'book.jpg', label: 'COMMANDES'},
    gestion: { imageUrl: 'sac.jpg', label: 'GESTION'},
};

/**
 * @brief Renders a set of buttons based on the provided keys.
 *
 * This component dynamically generates buttons based on a list of keys, mapping each key
 * to the corresponding button data. It passes the `setConfig` function to buttons that need it.
 *
 * @param {Object} props - Component properties.
 * @param {string[]} props.buttons - An array of button keys to render.
 * @param {function} props.setConfig - Function to handle configuration toggling, passed to relevant buttons.
 * @param {function} props.navigationPrev - A function to navigate to the prev order.
 * @param {function} props.navigationAfter - A function to navigate to the next order.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.updateActiveTab - A function to update the active tab.
 *
 * @return {JSX.Element} A set of rendered buttons.
 */
function ButtonSet({ buttons, activeTab, updateActiveTab }) {

    return (
        <div className="flex w-full">
            {buttons.map((key, i) => {
                const buttonInfo = buttonData[key]; // Retrieve the button data based on key

                if (!buttonInfo) {
                    return <div key={i} className='flex-1 bg-kitchen-blue'></div>;
                }

                const { imageUrl, label, onClickFunction } = buttonInfo;
                return (
                    <GenericButton
                        key={i}
                        label={label}
                        imageUrl={imageUrl}
                        activeTab={activeTab}
                        updateActiveTab={updateActiveTab}
                        onClickFunction={onClickFunction}
                    />
                );
            })}
        </div>
    );
}

ButtonSet.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired, ///< List of buttons to be rendered.
    activeTab: PropTypes.string.isRequired, ///< Currently active tab
    updateActiveTab: PropTypes.func.isRequired, ///< Function to handle tab changes
};

export default ButtonSet;