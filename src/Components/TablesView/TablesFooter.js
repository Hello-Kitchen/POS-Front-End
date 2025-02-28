import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import FooterButton from "./FooterButtons";
import Tables from "./Tables";

/**
 * TablesFooter component rendering the table pages footer buttons.
 * @param {function} setInEdit - useState functions used to change the behaviour of tables.
 * @returns {JSX.Element} The rendered TablesFooter component.
 */
function TablesFooter({setInEdit}) {

    const [activeButton, setActiveButton] = useState("None");

    useEffect(() => {
        if (activeButton === "Edit") {
            setInEdit(true)
        } else {
            setInEdit(false)
        }
    }, [activeButton, setInEdit]);

    return (
        <div className="row-span-1 bg-kitchen-blue shadow-button grid grid-flow-col grid-cols-12">
            <FooterButton url="fuse.png" type="Fuse" activeButton={activeButton} setActiveButton={setActiveButton} />
            {activeButton === "Fuse" &&
                <div className="col-span-4 grid grid-flow-col grid-cols-2 justify-center justify-items-center">
                    <div id="fuse-add" className="col-span-1 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-green self-center rounded-full">Fusionner</div>
                    <div id="fuse-del" className="col-span-1 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-red self-center rounded-full">Annuler</div>
                </div>
            }
            <FooterButton url="sep.png" type="Sep" activeButton={activeButton} setActiveButton={setActiveButton} />
            {activeButton === "Sep" &&
                <div className="col-span-9 grid grid-flow-col grid-cols-9 justify-center justify-items-center">
                    <div id="sep-add" className="col-span-2 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-green self-center rounded-full">Séparer</div>
                    <div id="sep-del" className="col-span-2 flex items-center justify-center w-3/4 h-2/4 font-bold text-3xl text-white bg-kitchen-button-red self-center rounded-full">Annuler</div>
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
    setInEdit: PropTypes.func.isRequired
}

export default TablesFooter;
