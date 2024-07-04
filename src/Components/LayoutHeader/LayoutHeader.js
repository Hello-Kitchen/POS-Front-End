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

function LayoutHeader({textCenter, textLeft}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
      <div className='w-full h-lh bg-kitchen-blue p-1'>
        <div className='w-full h-full flex justify-between items-center'>
            {<SideText text={textLeft}/>}
            {<CenterText text={textCenter}/>}
            {<SideText text={formatDate(currentTime)}/>}
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
    textLeft: PropTypes.string.isRequired,
}

export default LayoutHeader;