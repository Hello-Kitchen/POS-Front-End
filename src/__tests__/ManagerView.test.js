/* eslint-disable */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ManagerView from "../Pages/Manager/ManagerView";

// Mock the MenuListLine component
jest.mock("../Components/MenuListLine/MenuListLine", () => ({ title, onClick }) => (
    <div data-testid="menu-list-line" onClick={onClick}>
        {title}
    </div>
));

describe("ManagerView", () => {
    it("renders the default view with 'Gestion du compte' and 'Menu manager'", () => {
        render(<ManagerView />);

        // Check for "Gestion du compte"
        expect(screen.getByText("Gestion du compte")).toBeInTheDocument();

        // Check for "Menu manager"
        expect(screen.getByText("Menu manager")).toBeInTheDocument();
    });

    it("toggles to the manager menu view when 'Menu manager' is clicked", () => {
        render(<ManagerView />);

        // Click "Menu manager"
        fireEvent.click(screen.getByText("Menu manager"));

        // Check for "Menu manager" in the open state
        expect(screen.getByText("Menu manager")).toBeInTheDocument();

        // Check for "Gestion du menu"
        expect(screen.getByText("Gestion du menu")).toBeInTheDocument();

        // Check for "Gestion des utilisateurs"
        expect(screen.getByText("Gestion des utilisateurs")).toBeInTheDocument();
    });

    it("toggles back to the default view when 'Menu manager' is clicked in the open state", () => {
        render(<ManagerView />);

        // Open the manager menu
        fireEvent.click(screen.getByText("Menu manager"));

        // Close the manager menu
        fireEvent.click(screen.getByText("Menu manager"));

        // Check for "Gestion du compte"
        expect(screen.getByText("Gestion du compte")).toBeInTheDocument();

        // Check for "Menu manager"
        expect(screen.getByText("Menu manager")).toBeInTheDocument();
    });
});