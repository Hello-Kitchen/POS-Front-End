/* eslint-disable react/display-name, react/prop-types */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FoodManagement from "../../../Components/Manager/MenuManagement/FoodManagement";

jest.mock("../../../Components/Manager/MenuManagement/SideViewFood", () => () => <div data-testid="side-view-food" />);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("FoodManagement Component", () => {
    const mockSetAlert = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it("renders the DataGrid and toolbar", async () => {
        fetch.mockResolvedValueOnce({
            status: 200,
            json: async () => [],
        });

        render(
            <BrowserRouter>
                <FoodManagement setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        expect(screen.getByText("Ajouter un plat")).toBeInTheDocument();
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("handles unauthorized access during data fetch", async () => {
        fetch.mockResolvedValueOnce({
            status: 401,
        });

        render(
            <BrowserRouter>
                <FoodManagement setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/", {
                state: { error: "Unauthorized access. Please log in." },
            });
        });
    });

    it("opens the side view when adding a new food item", () => {
        render(
            <BrowserRouter>
                <FoodManagement setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Ajouter un plat"));

        expect(screen.getByTestId("side-view-food")).toBeInTheDocument();
    });
});