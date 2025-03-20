import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountManagement from "../Pages/Manager/AccountManagement";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("AccountManagement Component", () => {
    const mockNavigate = jest.fn();
    const mockOnClickBack = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem(
            "userInfo",
            JSON.stringify({ firstname: "John", lastname: "Doe", id: "123" })
        );
        localStorage.setItem("restaurantID", "456");
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        localStorage.clear();
    });

    test("renders user information correctly", () => {
        render(
            <AccountManagement onClickBack={mockOnClickBack} />,
            { wrapper: MemoryRouter }
        );

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(
            screen.getByText("Restaurant 456 - Employé 123")
        ).toBeInTheDocument();
    });

    test("calls onClickBack when ManagerHeader back button is clicked", () => {
        render(
            <AccountManagement onClickBack={mockOnClickBack} />,
            { wrapper: MemoryRouter }
        );

        const backButton = screen.getByText("Gestion du compte");
        fireEvent.click(backButton);

        expect(mockOnClickBack).toHaveBeenCalledTimes(1);
    });

    test("logs out and navigates to home on logout button click", () => {
        render(
            <AccountManagement onClickBack={mockOnClickBack} />,
            { wrapper: MemoryRouter }
        );

        const logoutButton = screen.getByText("Déconnexion");
        fireEvent.click(logoutButton);

        expect(localStorage.getItem("token")).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});