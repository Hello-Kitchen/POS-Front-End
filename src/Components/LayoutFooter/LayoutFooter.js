import React from 'react';
import { useNavigate } from "react-router-dom";

import buttonComponents from '../FooterButton/FooterButton';
import PropTypes from 'prop-types';

const ButtonEmpty = () => (
    <div className='w-4 h-10 bg-[#F2E5A2]'>
    </div>
);

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

function Footer({ buttons, price, config, setConfig, priceLess, setOrders }) {
    const navigate = useNavigate();

    return (
        <div className='w-full h-lf flex flex-row'>
            <div className='w-3/4 h-full bg-kitchen-yellow flex flex-row gap-0.5'>
                <div className='w-9/10 h-full bg-kitchen-yellow flex flex-row justify-between gap-0.5'>
                    {buttons.map(buttonKey => {
                        const ButtonComponent = Object.prototype.hasOwnProperty.call(buttonComponents, buttonKey) ? buttonComponents[buttonKey] : ButtonEmpty;
                        return <ButtonComponent key={buttonKey} />;
                    })}
                </div>
                <div className='w-1/10 h-full bg-kitchen-yellow flex'>
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
                    <div className='w-full h-full flex justify-center items-center truncate text-4xl font-bold text-kitchen-blue cursor-pointer' onClick={() => { setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement })); setOrders([{nb: ""}, []]); navigate(!config.payement ? '/dashboard/pay' : '/dashboard'); }}>
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
}

export default Footer;

