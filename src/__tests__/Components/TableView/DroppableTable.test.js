import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DroppableTable from "../../../Components/TablesView/DroppableTable";

describe("DroppableTable Component", () => {
    test("renders DroppableTable correctly", () => {
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        render(<DroppableTable table={table} inEdit={false} />);
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2 couv.")).toBeInTheDocument();
    });

    test("clicking table logs event", async () => {
        console.log = jest.fn();
        const table = { id: 1, type: "circle", w: 100, h: 100, left: 50, top: 50, plates: 2, time: "00:00" };
        render(<DroppableTable table={table} inEdit={false} />);

        const tableElement = screen.getByText("1");
        await userEvent.click(tableElement);
        
        expect(console.log).toHaveBeenCalledWith("Table 1 clicked");
    });
});
