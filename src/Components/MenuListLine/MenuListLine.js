import React from "react";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import PropTypes from 'prop-types';

function MenuListLine({title, open, onClick, separatorTop, separatorBottom}) {
    return (
        <div onClick={onClick}>
            {separatorTop && <div className="border border-black mx-5"/>}
            <div className="flex items-center p-4 place-content-between">
                <p className="font-bold text-3xl">{title}</p>
                {open ? <IoIosArrowDown size={30}/> : <IoIosArrowForward size={30}/>}
            </div>
            {separatorBottom && <div className="border border-black mx-5"/>}
        </div>
    );
}

MenuListLine.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    separatorTop: PropTypes.bool,
    separatorBottom: PropTypes.bool
}

MenuListLine.defaultProps = {
    open: false,
    onClick: () => {},
    separatorTop: false,
    separatorBottom: true
}

export default MenuListLine;