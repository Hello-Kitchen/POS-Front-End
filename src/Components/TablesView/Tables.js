import React from "react";

import CustomImage from "./CustomImage";

/**
 * Tables component rendering the available draggable tables in the table footer.
 * @returns {JSX.Element} The rendered Tables component.
 */
export default function Tables() {

    return (
        <div className="col-span-9 h-full flex gap-4 float-right mr-4 justify-end">
            <div id="plus" className="border-l-kitchen-yellow border-l-2 w-16 flex items-center justify-end">
                <CustomImage url={"./icon-drag/add.png"} />
            </div>
            <div id="square" className="w-10 h-10 self-center bg-kitchen-yellow aspect-square" />
            <div id="circle" className="w-10 h-10 self-center bg-kitchen-yellow rounded-full aspect-square" />
            <div id="rectangle" className="w-16 h-10 self-center bg-kitchen-yellow" />
        </div>
    );
}
