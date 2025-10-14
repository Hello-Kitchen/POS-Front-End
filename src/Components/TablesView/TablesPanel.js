import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

/**
 * PlatesButton component rendering the number of plates and buttons when editing a table.
 * @param {Object} editTable Object used to know which table is currently being edited
 * @param {Function} setEditTable state function used to update the table in edit
 * @returns {JSX.Element} The rendered PlatesButton component.
 */
function PlatesButton({ editTable, setEditTable }) {
	const [errorMessage, setErrorMessage] = useState("");

	const handleAdd = () => {
		setErrorMessage("");
		setEditTable((table) => ({
			...table,
			plates: table.plates + 1,
		}));
	};

	const handleDel = () => {
		if (editTable.plates <= 1) {
			setErrorMessage("Une table doit avoir au minimum 1 couvert");
			setTimeout(() => setErrorMessage(""), 3000);
			return;
		}
		setErrorMessage("");
		setEditTable((table) => ({
			...table,
			plates: table.plates - 1,
		}));
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

	return (
		<div className="pt-5">
			<div className="grid grid-flow-col">
				<div className="text-white text-4xl">
					{`Couverts : ${getTotalPlates(editTable)}`}
				</div>
				<button
					type="button"
					onClick={() => handleAdd()}
					className="text-white text-4xl border-white border-y-2 border-l-2 border-r rounded-l-lg"
				>
					+
				</button>
				<button
					type="button"
					onClick={() => handleDel()}
					className="text-white text-4xl border-white border-y-2 border-r-2 rounded-r-lg"
				>
					-
				</button>
			</div>
			{errorMessage && (
				<div className="text-red-500 text-xl mt-2 font-semibold">
					{errorMessage}
				</div>
			)}
		</div>
	);
}

/**
 * EditPanel component rendering all the edits of a table
 * @param {Object} editTable Object used to know which table is currently being edited
 * @param {Function} setEditTable state function used to update the table in edit
 * @param {Function} setBoard state function used to update the full table board
 * @returns {JSX.Element} The rendered EditPanel component.
 */
function EditPanel ({ editTable, setEditTable, setBoard, board }) {

    const [nameBool, setNameBool] = useState(false);
    const [nameValue, setNameValue] = useState('');

    const handleInputChange = (event) => {
        console.log(board)
        const nameExists = board.some(table => 
            String(table.id) === String(event.target.value)
        );
		if (!nameExists) setNameValue(event.target.value);
    };

	const handleInputSubmit = (name) => {
		setEditTable((table) => ({
			...table,
			id: name,
		}));
	};

	const handleNameClick = () => {
		nameBool ? setNameBool(false) : setNameBool(true);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (nameValue.trim() !== "") {
			handleInputSubmit(nameValue);
			setNameValue("");
		}
	};

	const handleTableDelete = () => {
		if (editTable.id !== -1) {
			setBoard((prevBoard) =>
				prevBoard.filter(
					(table) =>
						!(table.left === editTable.left && table.top === editTable.top),
				),
			);
		}
		setEditTable({ id: -1 });
	};

	return (
		<div className="h-full">
			<div
				className={`w-full p-2 items-center border-b-4 border-b-kitchen-yellow`}
			>
				<form
					onSubmit={handleFormSubmit}
					className={`w-full h-full grid grid-flow-row ${nameBool ? "grid-rows-2" : "grid-rows-1"}`}
				>
					<div className="row-span-1 text-white font-bold text-4xl items-center flex float-left">
						{`Table ${editTable.id}`}
						<button
							type="submit"
							onClick={() => handleNameClick()}
							className="pl-2 justify-center items-center"
						>
							<img
								src={`./icon-drag/edit.png`}
								width={40}
								height={40}
								alt="Pencil image, used as a meaning to say 'edit'"
							/>
						</button>
					</div>
					{nameBool === true && (
						<input
							type="text"
							className="text-2xl text-black row-span-1 border-2 rounded-full focus:outline-none px-4 float-left mt-1 mb-1 w-full"
							placeholder="New name"
							value={nameValue}
							onChange={handleInputChange}
						/>
					)}
				</form>
			</div>
			<PlatesButton editTable={editTable} setEditTable={setEditTable} />
			<button
				type="button"
				onClick={() => handleTableDelete()}
				className="w-full h-1/3 mt-4 text-white bg-kitchen-button-red font-bold text-3xl items-center justify-center self-center rounded-full"
			>
				Supprimer
			</button>
		</div>
	);
}

/**
 * TablePanel component rendering the table right panel.
 * @param {[Object]} orders current order
 * @param {Object} editTable Object used to know which table is currently being edited
 * @param {Function} setEditTable state function used to update the table in edit
 * @param {Function} setOrders state function used to update the current order
 * @returns {JSX.Element} The rendered TablesPanel component.
 */
export default function TablesPanel({ setDataToBeSaved, orders, editTable, setEditTable, setBoard, board }) {

    const basicTable = (
        <div className='w-full p-2 items-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow flex'>{`Table ${orders.number}`}</div>
    )

	useEffect(() => {
		if (editTable.id !== -1) {
			setBoard((prevBoard) =>
				prevBoard.map((table) =>
					table.left === editTable.left && table.top === editTable.top
						? editTable
						: table,
				),
			);
		}
	}, [editTable, setBoard]);

    return (
        <div className='h-full col-span-1 bg-kitchen-blue float-right flex flex-col justify-between'>
            <div className={'w-full max-h-[80%] float-right px-2 gap-3 flex flex-col'}>
                {editTable.id !== -1 ? <EditPanel board={board} setDataToBeSaved={setDataToBeSaved} editTable={editTable} setEditTable={setEditTable} setBoard={setBoard} /> : basicTable}
            </div>
        </div>
    );
}

PlatesButton.propTypes = {
	editTable: PropTypes.object.isRequired,
	setEditTable: PropTypes.func.isRequired,
};

EditPanel.propTypes = {
	setDataToBeSaved: PropTypes.func.isRequired,
	editTable: PropTypes.object.isRequired,
	setEditTable: PropTypes.func.isRequired,
	setBoard: PropTypes.func.isRequired,
};

TablesPanel.propTypes = {
	setDataToBeSaved: PropTypes.func,
	orders: PropTypes.object.isRequired,
	editTable: PropTypes.object.isRequired,
	setEditTable: PropTypes.func.isRequired,
	setBoard: PropTypes.func.isRequired,
};
