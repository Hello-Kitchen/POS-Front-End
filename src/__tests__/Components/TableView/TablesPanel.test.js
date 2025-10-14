import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TablesPanel from "../../../Components/TablesView/TablesPanel";

describe("PlatesButton", () => {
	let setEditTableMock;
	let editTable;

	beforeEach(() => {
		setEditTableMock = jest.fn();
		editTable = { plates: 3 };
	});

	test("renders PlatesButton", () => {
		render(
			<TablesPanel
				orders={[{ nb: 1 }]}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={jest.fn()}
			/>,
		);

		expect(screen.getByText(/Couverts : 3/i)).toBeInTheDocument();
	});

	test('"+" button click', () => {
		render(
			<TablesPanel
				orders={[{ nb: 1 }]}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={jest.fn()}
			/>,
		);

		fireEvent.click(screen.getByText("+"));

		expect(setEditTableMock).toHaveBeenCalledWith(expect.any(Function));
		expect(setEditTableMock).toHaveBeenCalledTimes(1);
	});

	test('"-" button click', () => {
		render(
			<TablesPanel
				orders={[{ nb: 1 }]}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={jest.fn()}
			/>,
		);

		fireEvent.click(screen.getByText("-"));

		expect(setEditTableMock).toHaveBeenCalledWith(expect.any(Function));
		expect(setEditTableMock).toHaveBeenCalledTimes(1);
	});

	test("does not decrement below 1 and shows error message", () => {
		editTable.plates = 1;
		render(
			<TablesPanel
				orders={[{ nb: 1 }]}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={jest.fn()}
			/>,
		);

		fireEvent.click(screen.getByText("-"));

		expect(setEditTableMock).not.toHaveBeenCalled();
		expect(
			screen.getByText("Une table doit avoir au minimum 1 couvert"),
		).toBeInTheDocument();
	});
});

describe("EditPanel", () => {
	let setEditTableMock;
	let editTable;

	beforeEach(() => {
		setEditTableMock = jest.fn();
		editTable = { id: "1", plates: 3 };
	});

	test("renders EditPanel", () => {
		render(
			<TablesPanel
				orders={[{ nb: 1 }]}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={jest.fn()}
			/>,
		);

		expect(screen.getByText("Table 1")).toBeInTheDocument();
	});
});

describe("TablesPanel", () => {
	let setEditTableMock;
	let setBoardMock;
	let orders;
	let editTable;

	beforeEach(() => {
		setEditTableMock = jest.fn();
		setBoardMock = jest.fn();
		orders = [{ nb: 1 }];
		editTable = { id: 1, plates: 3, left: 1, top: 1 };
	});

	test("renders TablesPanel", () => {
		render(
			<TablesPanel
				orders={orders}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={setBoardMock}
			/>,
		);

		expect(screen.getByText("Table 1")).toBeInTheDocument();
	});

	test("EditPanel when table is being edited", () => {
		render(
			<TablesPanel
				orders={orders}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={setBoardMock}
			/>,
		);

		fireEvent.click(screen.getByText("Table 1"));

		expect(screen.getByText("Couverts : 3")).toBeInTheDocument();
	});

	test("calls setBoard", () => {
		render(
			<TablesPanel
				orders={orders}
				editTable={editTable}
				setEditTable={setEditTableMock}
				setBoard={setBoardMock}
			/>,
		);

		act(() => {
			setEditTableMock({ id: 2, plates: 5, left: 1, top: 1 });
		});

		expect(setBoardMock).toHaveBeenCalled();
	});
});
