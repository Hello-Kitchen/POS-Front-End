import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";

import { useDrop } from "react-dnd";
import TablesFooter from "./TablesFooter";
import TablesPanel from "./TablesPanel";

import { ItemTypes } from "./Constants";
import DroppableTable from "./DroppableTable";
import { loadTableBoard } from "../../Pages/Loading/Loading";

const TableList = [
    {type: "square", plates: 2, w: 100, h: 100, time: "00:00", fused: []},
    {type: "circle", plates: 2, w: 100, h: 100, time: "00:00", fused: []},
    {type: "rectangle", plates: 4, w: 200, h: 100, time: "00:00", fused: []}
]

/**
 * TableView component rendering the table page.
 * @param {[Object]} orders current order
 * @param {Function} setOrders state function used to update the current order
 * @param {[Object]} board Array Object of the current POS tables
 * @param {Function} setBoard state function used to update the tables board
 * @returns {JSX.Element} The rendered TablesView component.
 */
export default function TablesView({ orders, setOrders, board, setBoard, orderSelect, drawerOpen, setDrawerOpen }) {

    const navigate = useNavigate();

    const [inEdit, setInEdit] = useState(false);
    const [inFuse, setInFuse] = useState({type: "None", fusedList: [], sepList: []});
    const [editTable, setEditTable] = useState({id: -1, plates: 0});
    const [dataToBeSaved, setDataToBeSaved] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const drop = useDrop(() => ({
        accept: [ItemTypes.CIRCLE, ItemTypes.SQUARE, ItemTypes.RECTANGLE],
        drop: (item, monitor) => {
            const dropArea = document.getElementById("drop-area");
            if (!dropArea) return;

            if (item.table) {
                const delta = monitor.getDifferenceFromInitialOffset();
                if (!delta) return;

                const currentTable = board.find(t => t.id === item.id);
                if (!currentTable) return;

                const left = currentTable.left + delta.x;
                const top = currentTable.top + delta.y;

                setBoard((prevBoard) =>
                    prevBoard.map((table) =>
                    table.id === item.id ? { ...table, left, top } : table
                    )
                );
            } else {
                const offset = monitor.getSourceClientOffset();
                if (!offset) return;

                const containerRect = dropArea.getBoundingClientRect();
                const left = offset.x;
                const top = offset.y;

                if (left > containerRect.left && top > containerRect.top) {
                    addTable(item.id, left, top, containerRect);
                }
            }
            setDataToBeSaved(true);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [board])[1];

    const doesOverlap = (x, y, board) => {
        let check = false;
        board.forEach((table) => {
            if (x < table.left + table.w && x + table.w > table.left && y < table.top + table.h && y + table.h > table.top) {
                check = true;
            }
        });
        return check;
    };

    const outOfBounds = (x, y, elem, containerRect) => {
        let check = false;
        if (x + elem.w > containerRect.width || y + elem.h > containerRect.height) {
            check = true;
        }
        return check;
    };

    function collectIds(board) {
        const ids = new Set();

        function getId(board) {
            for (const table of board) {
                if (table.id !== undefined) {
                    ids.add(Number(table.id));
                }
                if (Array.isArray(table.fused)) {
                    getId(table.fused);
                }
            }
        }
        getId(board);
        return ids;
    }
    function generateId(board) {
        const tablesIds = collectIds(board);
        let newId = 1;
        while (tablesIds.has(newId)) {
            newId++;
        }
        return newId;
    }

    const addTable = (type, left, top, containerRect) => {
        setBoard((prevBoard) => {
            const table = TableList.find((table) => table.type === type);
            if (table) {
                left = left - (table.w / 4);
                top = top - (table.h / 4);
                if (doesOverlap(left, top, prevBoard)) {
                    return prevBoard;
                }
                if (outOfBounds(left, top, table, containerRect)) {
                    return prevBoard;
                }
                const id = generateId(prevBoard)
                return [...prevBoard, { ...table, id, left, top }];
            }
            return prevBoard;
        });
    };

    useEffect(() => {
        if (inEdit === false) {
            setEditTable({id: -1, plates: 0})
            if (isFirstRender === false)
                setDataToBeSaved(true)
        }
        // linter want isFirstRender to be in the dependency array, but it will defeat the purpose of the useState
        // eslint-disable-next-line
    }, [inEdit]);

    useEffect(() => {
        loadTableBoard(setBoard);
        setIsFirstRender(false);
    }, [setBoard]);

    const createConfigBoard = (board) => {
        let configBoard = board.map((table) => {
            let obj = {
                x: table.left,
                y: table.top,
                name: table.id.toString(),
                id: parseInt(table.id),
                type: table.type,
                plates: table.plates,
                time: table.time,
                orderId: table.orderId ? table.orderId : null,
            }
            if (table.fused.length > 0) {
                obj = {
                    ...obj,
                    fused: createConfigBoard(table.fused)
                }
            }
            return obj
        })
        return configBoard;
    }

    const saveTable = () => {
        let configBoard = createConfigBoard(board);
        const {innerWidth: width, innerHeight: height} = window;
        let config = {
            tables: configBoard,
            width: width,
            height: height,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/pos_config/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify(config)
        })
        .then(response => {
            if (response.status === 401) {
                navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                throw new Error("Unauthorized access. Please log in.");
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (dataToBeSaved === true) {
            saveTable();
            setDataToBeSaved(false);
        }
    // linter want saveTable to be in the dependency array, but it will create an infinite loop
    // eslint-disable-next-line
    }, [dataToBeSaved]);

    const boardElem = board.map((table) => (
        <DroppableTable key={table.id} setDataToBeSaved={setDataToBeSaved} table={table} inEdit={inEdit} editTable={editTable} inFuse={inFuse} setInFuse={setInFuse} setEditTable={setEditTable} setOrders={setOrders} orderSelect={orderSelect} />
    ));

    return (
        <div className="w-full h-full grid grid-flow-col grid-cols-4">
            <div className="lg:col-span-3 col-span-4 grid grid-flow-row grid-rows-10">
                <div id="drop-area" ref={drop} className="row-span-9">
                    {boardElem}
                </div>
                <TablesFooter setDataToBeSaved={setDataToBeSaved} setInEdit={setInEdit} inFuse={inFuse} setInFuse={setInFuse} setBoard={setBoard} />
            </div>
            {window.innerWidth > 1024 && (
                <TablesPanel orders={orders} editTable={editTable} setEditTable={setEditTable} setBoard={setBoard} />
            )}
            {window.innerWidth < 1024 && (
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    slotProps={{
                        paper: {
                        sx: { width: '75%' },
                      },
                    }}
                >
                    <div className="w-full h-full flex flex-col justify-between">
                        <TablesPanel orders={orders} editTable={editTable} setEditTable={setEditTable} setBoard={setBoard} />
                    </div>
                </Drawer>
            )}
        </div>
    );
}

TablesView.propTypes = {
    orders: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    board: PropTypes.array.isRequired,
    setBoard: PropTypes.func.isRequired,
    orderSelect: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    setDrawerOpen: PropTypes.func.isRequired
}
