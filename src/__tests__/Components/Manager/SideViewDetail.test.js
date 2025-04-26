import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SideViewDetail from "../../../Components/Manager/MenuManagement/SideViewDetail";

describe("SideViewDetail Component", () => {
    const mockSetAlert = jest.fn();
    const mockRefreshData = jest.fn();

    const mockSelectedDetail = {
        id: 1,
        name: "Test Detail",
        multiple: false,
        data: [
            { type: "text", name: "Detail 1" },
            { type: "food", name: "Detail 2" },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component with initial data", () => {
        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        expect(screen.getByLabelText("Nom")).toHaveValue("Test Detail");
        expect(screen.getByText("Multiple:")).toBeInTheDocument();
        expect(screen.getAllByRole("textbox")).toHaveLength(3); // 1 for name, 2 for data
    });

    it("updates the name field", () => {
        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        const nameField = screen.getByLabelText("Nom");
        fireEvent.change(nameField, { target: { value: "Updated Name" } });

        expect(nameField).toHaveValue("Updated Name");
    });

    it("toggles the multiple switch", () => {
        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        const switchElement = screen.getByRole("checkbox");
        expect(switchElement).not.toBeChecked();

        fireEvent.click(switchElement);
        expect(switchElement).toBeChecked();
    });

    it("adds a new detail", () => {
        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        const addButton = screen.getAllByTestId("AddIcon")[0];
        fireEvent.click(addButton);

        expect(screen.getAllByRole("textbox")).toHaveLength(4); // 1 for name, 3 for data
    });

    it("removes a detail", () => {
        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        const deleteButton = screen.getAllByTestId("DeleteIcon")[0];
        fireEvent.click(deleteButton);

        expect(screen.getAllByRole("textbox")).toHaveLength(2); // 1 for name, 1 for data
    });

    it("calls sendDetail on save button click", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({}),
            })
        );

        render(
            <SideViewDetail
                selectedDetail={mockSelectedDetail}
                setAlert={mockSetAlert}
                refreshData={mockRefreshData}
            />
        );

        const saveButton = screen.getByText("Enregistrer");
        fireEvent.click(saveButton);

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});