import React, { useState, useEffect } from 'react';

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
 */
function LayoutHeader({textCenter}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-[60px] w-full md:h-lh bg-kitchen-blue p-1'>
            <div className='w-full h-full flex justify-between items-center'>
                <SideText text={`${userInfo.id} - ${userInfo.firstname} ${userInfo.lastname}`} />
                <div className='block pr-4 md:pr-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
                    <CenterText text={textCenter} />
                </div>
                <div className='hidden md:block'>
                    <SideText text={formatDate(currentTime)} />
                </div>
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