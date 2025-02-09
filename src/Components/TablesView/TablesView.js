import React from "react";

import TablesFooter from "./TablesFooter";

export default function TablesView() {

    return (
        <div className="h-full grid grid-flow-row grid-rows-10">
            <div className="row-span-9">
            </div>
            <TablesFooter />
        </div>
    );
}

TablesView.propTypes = {}