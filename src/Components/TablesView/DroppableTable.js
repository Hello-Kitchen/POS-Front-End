import React from "react";
import PropTypes from "prop-types";

/**
 * DroppableTable component rendering the dragged tables onto the main div.
 * @param {Object} table - table object containing the main informations, such as table name, number of plates, positions...
 * @param {boolean} inEdit - boolean used to change style and behaviour of the tables.
 * @returns {JSX.Element} The rendered DroppableTable component.
 */
function DroppableTable({table, inEdit}) {

    const onTableClick = () => {
        console.log("Table " + table.id + " clicked")
    };

    return (
        <div onClick={() => onTableClick()} name={table.id} className={`${table.type === "circle" ? "rounded-full" : ""} border-4 absolute col-span-1 grid grid-flow-row ${inEdit === true ? "bg-grey-bg border-black grid-rows-2" : table.time === "00:00" ? "bg-kitchen-green border-kitchen-green grid-rows-3" : "bg-kitchen-yellow border-kitchen-yellow grid-rows-3"} justify-center justify-items-center`} style={{width: table.w, height: table.h, top: table.top, left: table.left}}>
            <div className={`${table.type === "circle" ? "text-2xl" : "text-3xl"} row-span-1 self-center font-bold`}>{table.id}</div>
            <div className={`${table.type === "circle" ? "text-xl" : "text-2xl"} row-span-1 self-center`}>{table.plates} {table.type === "rectangle" ? "couverts" : "couv."}</div>
            {inEdit === false ? table.time === "00:00" ?
                <div className="row-span-1 self-center text-1xl">{table.type === "rectangle" ? "Disponible" : "Dispo."}</div>
                : <div className="row-span-1 text-1xl">{table.time}</div> 
                : <div/>}
        </div>
    );
}

DroppableTable.propTypes = {
    table: PropTypes.object.isRequired,
    inEdit: PropTypes.bool.isRequired
}

export default DroppableTable;
