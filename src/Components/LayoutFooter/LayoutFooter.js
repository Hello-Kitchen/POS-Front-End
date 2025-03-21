import React from 'react';
import { useNavigate } from "react-router-dom";

import ButtonSet from '../FooterButton/FooterButton';
import PropTypes from 'prop-types';

const NewTicket = () => (
    <div className='w-full h-full bg-kitchen-blue flex flex-col justify-center items-center'>
        <svg viewBox="0 0 24 24" height="70" width="70" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="imageNewTicket" patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href="/new_ticket.jpg" x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill="url(#imageNewTicket)" />
        </svg>
    </div>
)

/**
 * Component : Footer of the main Layout component, handles all the buttons not related to food and categories
 *
 * @component Footer
 * @param {[String]} buttons Array of the footer buttons, defined in the layout
 * @param {Number} price full price of the current order
 * @param {Object} config state of the current order
 * @param {Function} setConfig state function to update the config of the current order
 * @param {Number} priceLess full price of the current order
 * @param {Function} setOrders state function to update the current orders
 * @param {String} activeTab currently active tab
 * @param {Function} updateActiveTab function to update active tab
 * @param {Function} setSelectedOrder function to update selected order
 */
function Footer({ buttons, price, config, setConfig, priceLess, setOrders, activeTab, updateActiveTab, setSelectedOrder }) {
    const navigate = useNavigate();

    return (
        <div className='w-full h-lf flex flex-row'>
            <div className='w-3/4 h-full bg-kitchen-yellow flex flex-row gap-0.5'>
                <div className='w-full bg-kitchen-yellow flex flex-row justify-between'>
                    <ButtonSet buttons={buttons} activeTab={activeTab} updateActiveTab={updateActiveTab} />
                </div>
                <div data-testid="new-ticket" className='w-1/10 h-full bg-kitchen-yellow flex cursor-pointer' onClick={() => {setOrders([{nb: "42"}, [], {channel: "En salle"}, {orderId: null}]);setConfig({payement: false, firstSend: true, id_order: null}); setSelectedOrder("")}}>
                    <NewTicket />
                </div>
            </div>
            {(priceLess > 0) || (!config.payement) ? (
                <div className='w-1/4 h-full bg-kitchen-yellow flex justify-center items-center p-3 shadow-[inset_0_10px_50px_-20px_rgba(0,0,0,0.7)]'>
                    <div className='w-full h-full flex justify-center items-center truncate text-4xl font-bold text-kitchen-blue cursor-pointer' onClick={() => { setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement })); navigate(!config.payement ? '/dashboard/pay' : '/dashboard'); }}>
                        {!config.payement ? `Encaisser ${Number(price).toFixed(2).toString()}€` : 'Retour'}
                    </div>
                </div>
            ) : (
                <div className='w-1/4 h-full bg-kitchen-yellow flex justify-center items-center p-3 shadow-[inset_0_10px_50px_-20px_rgba(0,0,0,0.7)]'>
                    <div className='w-full h-full flex justify-center items-center truncate text-4xl font-bold text-kitchen-blue cursor-pointer' onClick={() => { setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement })); setOrders([{nb: "42"}, [], {id_restaurant: 4}, {channel: "En salle"}]); navigate(!config.payement ? '/dashboard/pay' : '/dashboard'); }}>
                        Terminée
                    </div>
                </div>
            )}
        </div>
    );
}

Footer.propTypes = {
    buttons: PropTypes.array.isRequired,
    price: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    setOrders: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    setSelectedOrder: PropTypes.func.isRequired,
}

export default Footer;
