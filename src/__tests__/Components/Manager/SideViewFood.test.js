import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideViewFood from "../../../Components/Manager/MenuManagement/SideViewFood";

const mockSetAlert = jest.fn();
const mockRefreshData = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("SideViewFood Component", () => {
    const mockSelectedFood = {
        id: 1,
        name: "Pizza",
        price: 10,
        id_category: 2,
        details: [1, 2],
        ingredients: [3, 4],
    };

    const mockFoodDetails = [
        { id: 1, name: "Spicy" },
        { id: 2, name: "Cheesy" },
    ];

    const mockFoodIngredients = [
        { id: 3, name: "Tomato" },
        { id: 4, name: "Cheese" },
    ];

    const mockFoodCategories = [
        { id: 2, name: "Main Course" },
        { id: 3, name: "Dessert" },
    ];

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <SideViewFood
                    selectedFood={mockSelectedFood}
                    foodDetails={mockFoodDetails}
                    foodIngredients={mockFoodIngredients}
                    foodCategories={mockFoodCategories}
                    setAlert={mockSetAlert}
                    refreshData={mockRefreshData}
                />
            </BrowserRouter>
        );

    it("renders the component with initial values", () => {
        renderComponent();

        expect(screen.getByLabelText("Nom")).toHaveValue("Pizza");
        expect(screen.getByLabelText("Prix")).toHaveValue(10);
        expect(screen.getByLabelText("Catégorie")).toHaveValue("Main Course");
    });

    it("updates the food name when input changes", () => {
        renderComponent();

        const nameInput = screen.getByLabelText("Nom");
        fireEvent.change(nameInput, { target: { value: "Burger" } });

        expect(nameInput).toHaveValue("Burger");
    });

    it("updates the food price when input changes", () => {
        renderComponent();

        const priceInput = screen.getByLabelText("Prix");
        fireEvent.change(priceInput, { target: { value: "15" } });

        expect(priceInput).toHaveValue(15);
    });

    it("calls the sendFood function when the save button is clicked", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({}),
            })
        );

        renderComponent();

        const saveButton = screen.getByText("Enregistrer");
        fireEvent.click(saveButton);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/api/"),
            expect.objectContaining({
                method: "PUT",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                }),
            })
        );

        await screen.findByText("Enregistrer"); // Wait for the button to re-render
        expect(mockSetAlert).toHaveBeenCalledWith({
            type: "success",
            message: "Plat mis à jour avec succès",
        });

        global.fetch.mockRestore();
    });

    it("navigates to login page on unauthorized access", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 401,
            })
        );

        renderComponent();

        const saveButton = screen.getByText("Enregistrer");
        fireEvent.click(saveButton);

        await screen.findByText("Enregistrer"); // Wait for the button to re-render
        expect(mockNavigate).toHaveBeenCalledWith("/", {
            state: { error: "Unauthorized access. Please log in." },
        });

        global.fetch.mockRestore();
    });
});