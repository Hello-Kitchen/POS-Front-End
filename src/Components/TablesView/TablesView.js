import React from "react";

import TablesFooter from "./TablesFooter";

/**
 * TableView component rendering the table page.
 * @returns {JSX.Element} The rendered TablesView component.
 */
export default function TablesView() {

    return (
        <div className="h-full grid grid-flow-row grid-rows-10">
            <div className="row-span-9">
            </div>
            <TablesFooter />
        </div>
    );
}
