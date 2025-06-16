import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";

import PropTypes from 'prop-types';

function CenterText({text}) {
    return (
        <p className='text-white font-bold text-4xl'>{text}</p>
    );
}

function SideText({text}) {
    return (
        <p className='text-white font-normal text-2xl'>{text}</p>
    );
}

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

/**
 * Component : Header of the main Layout component, displays relevant user informations
 * 
 * @component LayoutHeader
 * @param {String} textCenter Number and name of logged in user
 * @param {String} textLeft number of the current active POS
 */
function LayoutHeader({textCenter}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
      <div className='w-full h-lh bg-kitchen-blue p-1'>
        <div className='w-full h-full flex justify-between items-center'>
            {!isMobile && <SideText text={`${userInfo.id} - ${userInfo.firstname} ${userInfo.lastname}`}/>}
            {!isMobile && <CenterText text={textCenter}/>}
            {!isMobile && <SideText text={formatDate(currentTime)}/>}
        </div>
      </div>
    );
}

CenterText.propTypes = {
    text: PropTypes.string.isRequired,
}

SideText.propTypes = {
    text: PropTypes.string.isRequired,
}

LayoutHeader.propTypes = {
    textCenter: PropTypes.string.isRequired,
}

export default LayoutHeader;