import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * DroppableTable component rendering the dragged tables onto the main div.
 * @param {Object} table - table object containing the main informations, such as table name, number of plates, positions...
 * @param {boolean} inEdit - boolean used to change style and behaviour of the tables.
 * @param {Object} editTable Object used to know which table is currently being edited
 * @param {Object} inFuse Object used to know which table is currently being selected to fuse, and which are already fused
 * @param {Function} setInFuse state function used to check the type of fuse, and update the arrays containing fused tables and selected tables
 * @param {Function} setEditTable state function used to update the table in edit
 * @param {Function} setOrders state function used to update the current order
 * @returns {JSX.Element} The rendered DroppableTable component.
 */
function DroppableTable({table, inEdit, editTable, inFuse, setInFuse, setEditTable, setOrders, orderSelect}) {

    const [border, setBorder] = useState("border-black")
    const [fuseBorder, setFuseBorder] = useState("border-kitchen-green")
    const [currentTime, setCurrentTime] = useState(new Date());

    const onTableClick = (orderId) => {
        if (inFuse.type !== "None") {
            setInFuse((fused) => {
                const filteredList = fused.fusedList.filter((t) => t.left !== table.left || t.top !== table.top);
                if (filteredList.length < fused.fusedList.length) {
                    if (table.time === "00:00") {
                        setFuseBorder("border-kitchen-green")
                    } else {
                        setFuseBorder("border-kitchen-yellow")
                    }
                    return {...fused, fusedList: filteredList, sepList: [...fused.sepList]};
                }
                const newList = [...filteredList, table];
                setFuseBorder("border-kitchen-button-orange")
                if (inFuse.type === "Fuse" && newList.length > 2) {
                    newList.shift();
                } else if (inFuse.type === "Sep" && newList.length > 1) {
                    newList.shift();
                }
                return {...fused, fusedList: newList, sepList: [...fused.sepList]};
              });
        } else if (inEdit) {
            setBorder("border-kitchen-button-orange")
            setEditTable(table)
        } else {
            setOrders((Order) => ({...Order, number: table.id.toString(), tableId: table.id, orderId: null, food: []}));
            orderSelect(orderId);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);
    
    /**
     * @function calculateWaitingTime
     * @description Calculates the waiting time for the order based on the order date.
     * @param {string} orderDate - The date when the order was placed.
     * @returns {Object} The calculated waiting time in hours, minutes, and seconds.
     */
    const calculateWaitingTime = (orderDate) => {
        const diff = new Date(currentTime) - new Date(orderDate);
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
      
        return {
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        };
    };
      
    const getTotalPlates = (table) => {
        let total = table.plates || 0;
        if (table.fused && table.fused.length > 0) {
            for (const fusedTable of table.fused) {
                total += getTotalPlates(fusedTable);
            }
        }
        return total;
    };

    useEffect(() => {
        if (!inFuse.fusedList.includes(table)) {
            if (table.time === "00:00") {
                setFuseBorder("border-kitchen-green")
            } else {
                setFuseBorder("border-kitchen-yellow")
            }
        }
    }, [inFuse, table])

    useEffect(() => {
        if (table.top !== editTable.top && table.left !== editTable.left) {
            setBorder("border-black")
        }
    }, [editTable, table])

    const getResponsiveSizeClasses = (height, width) => {
        const base = 6.25
        const sm = 10
        const xl = 20
        const round = (num) => Number(num.toFixed(2));
        const baseH = round(height / base);
        const smH = round(height / sm);
        const xlH = round(height / xl);
        const baseW = round(width / base);
        const smW = round(width / sm);
        const xlW = round(width / xl);

        return {
            h: `h-[${baseH}vw] sm:h-[${smH}vw] xl:h-[${xlH}vw]`,
            w: `w-[${baseW}vw] sm:w-[${smW}vw] xl:w-[${xlW}vw]`
        };
    }
    const { h, w } = getResponsiveSizeClasses(table.h, table.w);
    console.log(h)
    console.log(w)

    return (
        <div onClick={() => onTableClick(table.orderId)} name={table.id} className={`${table.type === "circle" ? "rounded-full" : ""} border-4 absolute col-span-1 grid grid-flow-row ${inEdit === true ? `bg-grey-bg ${border} grid-rows-2` : table.time === "00:00" ? `bg-kitchen-green ${fuseBorder} grid-rows-3` : `bg-kitchen-yellow ${fuseBorder} grid-rows-3`} justify-center justify-items-center ${h} ${w} block`} style={{top: table.top, left: table.left}}>   
            <div className={`${table.type === "circle" ? (table.id.length > 5 ? "text-xl" : "text-2xl") : (table.id.length > 5 ? "text-2xl" : "text-3xl")} row-span-1 self-center font-bold`}>{table.id}</div>
            <div className={`${table.type === "circle" ? "text-xl" : "text-2xl"} row-span-1 self-center`}>{getTotalPlates(table)} {table.type === "rectangle" ? "couverts" : "couv."}</div>
            {inEdit === false ? table.time === "00:00" ?
                <div className="row-span-1 self-center text-1xl">{table.type === "rectangle" ? "Disponible" : "Dispo."}</div>
                : <div className="row-span-1 text-1xl">{calculateWaitingTime(table.time).hours}:{calculateWaitingTime(table.time).minutes}</div> 
                : <div/>}
        </div>
    );
}

DroppableTable.propTypes = {
    table: PropTypes.object.isRequired,
    inEdit: PropTypes.bool.isRequired,
    editTable: PropTypes.object.isRequired,
    inFuse: PropTypes.object.isRequired,
    setInFuse: PropTypes.func.isRequired,
    setEditTable: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    orderSelect: PropTypes.func.isRequired,
}

export default DroppableTable;
