import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DroppableTable from "../../../Components/TablesView/DroppableTable";
/* eslint-disable react/prop-types */
jest.mock("react-dnd", () => ({
    useDrag: () => [
        { isDragging: false },
        (el) => el,
    ],
    useDrop: () => [{}, (el) => el],
    DndProvider: ({ children }) => <div>{children}</div>,
}));
/* eslint-enable react/prop-types */

describe("DroppableTable Component", () => {
    const baseTable = {id: "1", type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00"};

    test("renders DroppableTable in non-edit mode", () => {
        render(
            <DroppableTable
                table={baseTable}
                inEdit={false}
                editTable={{}}
                inFuse={{type: "None", fusedList: [], sepList: []}}
                setInFuse={() => {}}
                setEditTable={() => {}}
                setOrders={() => {}}
            />
        );

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2 couv.")).toBeInTheDocument();
        expect(screen.getByText("Dispo.")).toBeInTheDocument();
    });

    test("renders DroppableTable in edit mode", () => {
        render(
            <DroppableTable
                table={baseTable}
                inEdit={true}
                editTable={{}}
                inFuse={{type: "None", fusedList: [], sepList: []}}
                setInFuse={() => {}}
                setEditTable={() => {}}
                setOrders={() => {}}
            />
        );

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2 couv.")).toBeInTheDocument();
    });

    test("clicking table in edit mode sets editTable and changes border", async () => {
        const setEditTable = jest.fn();
        const { container } = render(
            <DroppableTable
                table={baseTable}
                inEdit={true}
                editTable={{}}
                inFuse={{type: "None", fusedList: [], sepList: []}}
                setInFuse={() => {}}
                setEditTable={setEditTable}
                setOrders={() => {}}
            />
        );

        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);

        expect(setEditTable).toHaveBeenCalledWith(baseTable);
        expect(container.firstChild).toHaveClass("border-kitchen-button-orange");
    });

    test("clicking table when not in edit triggers order update", async () => {
        const setOrders = jest.fn();
        render(
            <DroppableTable
                table={baseTable}
                inEdit={false}
                editTable={{}}
                inFuse={{type: "None", fusedList: [], sepList: []}}
                setInFuse={() => {}}
                setEditTable={() => {}}
                setOrders={setOrders}
                orderSelect={() => {}}
            />
        );

        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);

        expect(setOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    test("clicking table when inFuse.type is Fuse updates fusedList", async () => {
        const setInFuse = jest.fn();
        const inFuseState = {type: "Fuse", fusedList: [], sepList: []};

        render(
            <DroppableTable
                table={baseTable}
                inEdit={false}
                editTable={{}}
                inFuse={inFuseState}
                setInFuse={setInFuse}
                setEditTable={() => {}}
                setOrders={() => {}}
            />
        );

        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);

        expect(setInFuse).toHaveBeenCalledWith(expect.any(Function));
    });

    test("renders correct time", () => {
        const tableWithTime = {...baseTable, time: new Date(Date.now() - 5 * 60 * 1000).toISOString()};

        render(
            <DroppableTable
                table={tableWithTime}
                inEdit={false}
                editTable={{}}
                inFuse={{type: "None", fusedList: [], sepList: []}}
                setInFuse={() => {}}
                setEditTable={() => {}}
                setOrders={() => {}}
            />
        );

        expect(screen.getByText("00:05")).toBeInTheDocument();
    });
});
