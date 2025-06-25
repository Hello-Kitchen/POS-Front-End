import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import ButtonSet from '../FooterButton/FooterButton';
import PropTypes from 'prop-types';
import ModalNewOrder from './ModalNewOrder';
import { IoMdArrowDropleft } from "react-icons/io";

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
 * Footer component for the POS Front-End application.
 * Renders a set of navigation/action buttons and controls for creating new orders and opening a drawer.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.buttons - Array of button configurations to render in the ButtonSet.
 * @param {Function} props.setConfig - Function to update configuration state.
 * @param {Function} props.setOrders - Function to update orders state.
 * @param {number|string} props.activeTab - Identifier for the currently active tab.
 * @param {Function} props.updateActiveTab - Function to update the active tab.
 * @param {Function} props.setSelectedOrder - Function to set the currently selected order.
 * @param {Function} props.setDrawerOpen - Function to open the drawer (typically for navigation or options).
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer({ buttons, setConfig, setOrders, activeTab, updateActiveTab, setSelectedOrder, setDrawerOpen }) {
    const [isModalOpen, setModalOpen] = useState(false);
    
    return (
        <div className='relative w-full h-[75px] flex flex-row sm:h-full'>
            <div className='w-full h-full bg-kitchen-yellow flex flex-row gap-0.5'>
                <div className='w-full bg-kitchen-yellow flex flex-row justify-between'>
                    <ButtonSet buttons={buttons} activeTab={activeTab} updateActiveTab={updateActiveTab} />
                </div>
                <div className='bg-kitchen-blue h-full w-2/10 lg:w-1/10 flex'>
                    <div data-testid="new-ticket" className='w -1/2 lg:w-full h-full flex cursor-pointer' onClick={() => {setModalOpen(!isModalOpen)}}>
                        <NewTicket />
                    </div>
                    <div className='w-1/2 h-full bg-kitchen-blue flex cursor-pointer lg:hidden items-center justify-center' onClick={() => {setDrawerOpen(true)}}>
                        <IoMdArrowDropleft size={75} color='F2E5A2'/>
                    </div>
                </div>
            </div>
            {isModalOpen && (<ModalNewOrder setModalOpen={setModalOpen} setConfig={setConfig} setOrders={setOrders} setSelectedOrder={setSelectedOrder}></ModalNewOrder>)}
        </div>
    );
}

export function FooterMainButton({ price, config, setConfig, priceLess, setOrders, payDetail, setPriceLess, setPayList }) {
    const navigate = useNavigate();
    
    const handlePayement = async () => {
        const body = { value: payDetail, user: Number(JSON.parse(localStorage.getItem("userInfo")).id), discount: 0 };
        await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders/payment/${config.id_order}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
    };

    return (
        <div className='w-full h-full'>
            {(priceLess > 0) || (!config.payement) ? (
                <div className='w-full h-full bg-kitchen-yellow flex justify-center items-center p-3 shadow-[inset_0_10px_50px_-20px_rgba(0,0,0,0.7)]'>
                    <div className='w-full h-full flex justify-center items-center truncate text-4xl font-bold text-kitchen-blue cursor-pointer' onClick={() => { setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement })); navigate(!config.payement ? '/dashboard/pay' : '/dashboard'); }}>
                        {!config.payement ? `Encaisser ${Number(price).toFixed(2).toString()}€` : 'Retour'}
                    </div>
                </div>
            ) : (
                <div className='w-full h-full bg-kitchen-yellow flex justify-center items-center p-3 shadow-[inset_0_10px_50px_-20px_rgba(0,0,0,0.7)]'>
                    <div className='w-full h-full flex justify-center items-center truncate text-4xl font-bold text-kitchen-blue cursor-pointer' onClick={() => { handlePayement(); setPriceLess(0); setPayList([]); setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement })); setOrders({number: "42", channel: "Sur place", orderId: null, food: [], tmp: {}}); navigate(!config.payement ? '/dashboard/pay' : '/dashboard'); }}>
                        Terminée
                    </div>
                </div>
            )}
        </div>
    )
}

Footer.propTypes = {
    buttons: PropTypes.array.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    setSelectedOrder: PropTypes.func.isRequired,
    setDrawerOpen: PropTypes.func.isRequired,
}

FooterMainButton.propTypes = {
    price: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    setOrders: PropTypes.func.isRequired,
    payDetail: PropTypes.array.isRequired,
    setPriceLess: PropTypes.func.isRequired,
    setPayList: PropTypes.func.isRequired,
}

export default Footer;
