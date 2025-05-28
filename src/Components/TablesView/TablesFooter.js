import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import FooterButton from "./FooterButtons";
import Tables from "./Tables";

/**
 * TablesFooter component rendering the table pages footer buttons.
 * @param {function} setInEdit - useState functions used to change the behaviour of tables.
 * @param {Object} inFuse Object used to know which table is currently being selected to fuse, and which are already fused
 * @param {Function} setInFuse state function used to check the type of fuse, and update the arrays containing fused tables and selected tables
 * @param {Function} setBoard state function used to update the tables board
 * @returns {JSX.Element} The rendered TablesFooter component.
 */
function TablesFooter({setDataToBeSaved, setInEdit, inFuse, setInFuse, setBoard}) {

    const [activeButton, setActiveButton] = useState("None");

    useEffect(() => {
        if (activeButton === "Edit") {
            setInFuse((fused) => {return({type: "None", fusedList: [...fused.fusedList], sepList: [...fused.sepList]})})
            setInEdit(true)
        } else if (activeButton === "Fuse") {
            setInFuse((fused) => {return({type: "Fuse", fusedList: [...fused.fusedList], sepList: [...fused.sepList]})})
            setInEdit(false)
        } else if (activeButton === "Sep") {
            setInFuse((fused) => {return({type: "Sep", fusedList: [...fused.fusedList], sepList: [...fused.sepList]})})
            setInEdit(false)
        } else {
            setInFuse((fused) => {return({type: "None", fusedList: [], sepList: [...fused.sepList]})})
            setInEdit(false)
        }
    }, [activeButton, setInEdit, setInFuse]);

    const checkTablePos = (table1, table2) => {
        let diffTop = Math.abs(table2.top - table1.top);
        let diffLeft = Math.abs(table2.left - table1.left);
        if (diffTop > diffLeft) {
            return true;
            //fusion vers le bas
        }
        return false;
        //fusion vers le haut
    }

    const onFuseAdd = () => {
        if (inFuse.fusedList.length > 1) {
            setBoard((prevBoard) => {
                const [table1, table2] = inFuse.fusedList;
                return prevBoard.reduce((newBoard, table) => {
                    const table1Check = table.left === table1.left && table.top === table1.top;
                    const table2Check = table.left === table2.left && table.top === table2.top;
                    if (table1Check) {
                        const size = checkTablePos(table1, table2);
                        const updatedTable = {
                            ...table,
                            h: table.h + (size ? table2.h : 0),
                            w: table.w + (!size ? table2.w : 0),
                            fused: [...(table.fused || []), JSON.parse(JSON.stringify(table2))],
                        };
                        newBoard.push(updatedTable);
                    } else if (!table2Check) {
                        newBoard.push(table);
                    }
                    return newBoard;
                }, []);
            });
            setInFuse((prevFuse) => {
                return {
                    ...prevFuse,
                    fusedList: [],
                    sepList: [...prevFuse.sepList, ...prevFuse.fusedList],
                };
            });
        }
        setDataToBeSaved(true)
    };

    const onSepAdd = () => {
        setBoard((prevBoard) => {
            if (inFuse.fusedList.length === 0) return prevBoard;

            const [fusedTable] = inFuse.fusedList;
            let lastFusedToRestore = null;

            const updatedBoard = prevBoard.map((table) => {
                const isFused = table.left === fusedTable.left && table.top === fusedTable.top;
                if (!isFused || !table.fused || table.fused.length === 0) return table;

                const newFused = [...table.fused];
                const lastTable = newFused.pop();
                const size = checkTablePos(table, lastTable);
                lastFusedToRestore = lastTable;

                return {
                    ...table,
                    fused: newFused,
                    h: table.h - (size ? lastTable.h : 0),
                    w: table.w - (!size ? lastTable.w : 0),
                };
            });
            return lastFusedToRestore ? [...updatedBoard, lastFusedToRestore] : updatedBoard;
        });
        setInFuse((prevFuse) => ({
            ...prevFuse,
            fusedList: [],
        }));
        setDataToBeSaved(true);
    };

    const onDel = () => {
        setActiveButton("None")
    };

    return (
        <div className="row-span-1 bg-kitchen-blue shadow-button grid grid-flow-col grid-cols-12">
            <FooterButton url="fuse.png" type="Fuse" activeButton={activeButton} setActiveButton={setActiveButton} />
            {activeButton === "Fuse" &&
                <div className="col-span-4 grid grid-flow-col grid-cols-2 justify-center justify-items-center">
                    <div onClick={() => onFuseAdd()} id="fuse-add" className="col-span-1 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-green self-center rounded-full">Fusionner</div>
                    <div onClick={() => onDel()} id="fuse-del" className="col-span-1 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-red self-center rounded-full">Annuler</div>
                </div>
            }
            <FooterButton url="sep.png" type="Sep" activeButton={activeButton} setActiveButton={setActiveButton} />
            {activeButton === "Sep" &&
                <div className="col-span-9 grid grid-flow-col grid-cols-9 justify-center justify-items-center">
                    <div onClick={() => onSepAdd()} id="sep-add" className="col-span-2 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-green self-center rounded-full">Séparer</div>
                    <div onClick={() => onDel()} id="sep-del" className="col-span-2 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-red self-center rounded-full">Annuler</div>
                    <div id="blank" className="col-span-5" />
                </div>
            }
            {activeButton === "Edit" &&
                <Tables />
            }
            {activeButton === "None" &&
            <div id="blank" className="col-span-9" />}
            {activeButton === "Fuse" &&
            <div id="blank" className="col-span-5" />}
            <FooterButton url="edit.png" type="Edit" activeButton={activeButton} setActiveButton={setActiveButton} />
        </div>
    );
}

TablesFooter.propTypes = {
    setDataToBeSaved: PropTypes.func.isRequired,
    setInEdit: PropTypes.func.isRequired,
    inFuse: PropTypes.object.isRequired,
    setInFuse: PropTypes.func.isRequired,
    setBoard: PropTypes.func.isRequired,
}

export default TablesFooter;
