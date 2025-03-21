import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DroppableTable from "../../../Components/TablesView/DroppableTable";

describe("DroppableTable Component", () => {
    test("renders DroppableTable", () => {
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        render(<DroppableTable table={table} inEdit={false} editTable={{}} setEditTable={() => {}} setOrders={() => {}} />);
        
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2 couv.")).toBeInTheDocument();
        expect(screen.getByText("Dispo.")).toBeInTheDocument();
    });

    test("renders DroppableTable edit mode", () => {
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        render(<DroppableTable table={table} inEdit={true} editTable={{}} setEditTable={() => {}} setOrders={() => {}} />);
        
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2 couv.")).toBeInTheDocument();
    });

    test("clicking table updates editTable", async () => {
        const setEditTable = jest.fn();
        const setOrders = jest.fn();
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        const { container } = render(
            <DroppableTable
                table={table}
                inEdit={true}
                editTable={{}}
                setEditTable={setEditTable}
                setOrders={setOrders}
            />
        );
        
        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);
        expect(setEditTable).toHaveBeenCalledWith(table);
        expect(container.firstChild).toHaveClass("border-kitchen-button-orange");
    });

    test("clicking table updates orders", async () => {
        const setEditTable = jest.fn();
        const setOrders = jest.fn();
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        render(
            <DroppableTable
                table={table}
                inEdit={false}
                editTable={{}}
                setEditTable={setEditTable}
                setOrders={setOrders}
            />
        );
        
        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);

        expect(setOrders).toHaveBeenCalledWith(expect.any(Function));
    });

    test("renders correct time", () => {
        const table = { id: 1, type: "rectangle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "15:30" };
        render(
            <DroppableTable
                table={table}
                inEdit={false}
                editTable={{}}
                setEditTable={() => {}}
                setOrders={() => {}}
            />
        );
        expect(screen.getByText("15:30")).toBeInTheDocument();
    });
});
