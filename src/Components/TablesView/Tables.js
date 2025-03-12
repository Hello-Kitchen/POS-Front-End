import React from "react";
import PropTypes from "prop-types";

import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";
import CustomImage from "./CustomImage";

/**
 * Table component rendering the available draggable tables in the table footer.
 * @param {string} type - the type of the table (ex: "Square", "Circle", "Rectangle"...) changes behaviour and styles.
 * @returns {JSX.Element} The rendered Table component.
 */
function Table({type}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: type === "square" ? ItemTypes.SQUARE : type === "circle" ? ItemTypes.CIRCLE : ItemTypes.RECTANGLE,
        item: { id: type },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} id={type} className={`${type === "rectangle" ? "w-16 h-10" : type === "square" ? "w-10 h-10 aspect-square" : "w-10 h-10 aspect-square rounded-full"} self-center bg-kitchen-yellow`} style={{opacity: isDragging ? 0.5 : 1}} />
    );
}

/**
 * Tables component rendering the available draggable tables in the table footer.
 * @returns {JSX.Element} The rendered Tables component.
 */
function Tables() {

    return (
        <div className="col-span-9 h-full flex gap-4 float-right mr-4 justify-end">
            <div id="plus" className="border-l-kitchen-yellow border-l-2 w-16 flex items-center justify-end">
                <CustomImage url={"./icon-drag/add.png"} />
            </div>
            <Table type={"square"} />
            <Table type={"circle"} />
            <Table type={"rectangle"} />
        </div>
    );
}


Table.propTypes = {
    type: PropTypes.string.isRequired
}

export default Tables;
