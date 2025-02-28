import React, { useState, useEffect } from "react";

import { useDrop } from "react-dnd";
import TablesFooter from "./TablesFooter";

import { ItemTypes } from "./Constants";
import DroppableTable from "./DroppableTable";

const TableList = [
    {type: "square", plates: 2, w: 100, h: 100, time: "00:00"},
    {type: "circle", plates: 2, w: 100, h: 100, time: "00:00"},
    {type: "rectangle", plates: 4, w: 200, h: 100, time: "00:00"}
]

/**
 * TableView component rendering the table page.
 * @returns {JSX.Element} The rendered TablesView component.
 */
export default function TablesView() {

    const [board, setBoard] = useState([]);
    const [inEdit, setInEdit] = useState(false);

    const drop = useDrop(() => ({
        accept: [ItemTypes.CIRCLE, ItemTypes.SQUARE, ItemTypes.RECTANGLE],
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;
    
            const container = document.getElementById("drop-area");
            const containerRect = container.getBoundingClientRect();
            const left = offset.x;
            const top = offset.y;

            if (left > containerRect.left && top > containerRect.top) {
                addTable(item.id, left, top, containerRect);
            }
    
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))[1];

    const doesOverlap = (x, y, board) => {
        let check = false
        board.map((table) => {
            if (x < table.left + table.w && x + table.w > table.left && y < table.top + table.h && y + table.h > table.top) {
                check = true
            }
        });
        return check
    };

    const outOfBounds = (x, y, elem, containerRect) => {
        let check = false
        if (x + elem.w > containerRect.width || y + elem.h > containerRect.height) {
            check = true
        }
        return check
    };

    const addTable = (type, left, top, containerRect) => {
        setBoard((prevBoard) => {
            if (doesOverlap(left, top, prevBoard)) {
                return prevBoard;
            }    
            const table = TableList.find((table) => table.type === type);
            if (outOfBounds(left, top, table, containerRect)) {
                return prevBoard;
            }
            const id = prevBoard.length
            if (table) {
                left = left - (table.w / 4);
                top = top - (table.h / 4);
                return [...prevBoard, { ...table, id, left, top }];
            }
            return prevBoard;
        });
    };

      useEffect(() => {
    }, [board]);

    return (
        <div className="h-full grid grid-flow-row grid-rows-10">
            <div id="drop-area" ref={drop} className="row-span-9">
                {board.map((table) => (
                    <DroppableTable
                        key={table.id}
                        table={table}
                        inEdit={inEdit}
                    />
                ))}
            </div>
            <TablesFooter setInEdit={setInEdit} />
        </div>
    );
}

TablesView.propTypes = {}
