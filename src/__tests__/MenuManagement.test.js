/* eslint-disable react/display-name, react/prop-types */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuManagement from "../Pages/Manager/MenuManagement";

// Mock child components
jest.mock("../Pages/Manager/ManagerHeader", () => jest.fn(() => <div data-testid="manager-header" />));
jest.mock("../Components/Manager/MenuManagement/FoodManagement", () => jest.fn(() => <div data-testid="food-management" />));
jest.mock("../Components/Manager/MenuManagement/DetailManagement", () => jest.fn(() => <div data-testid="detail-management" />));
jest.mock("../Components/Manager/MenuManagement/IngredientManagement", () => jest.fn(() => <div data-testid="ingredient-management" />));
jest.mock("../Components/Manager/MenuManagement/FoodCategoryManagement", () => jest.fn(() => <div data-testid="food-category-management" />));

describe("MenuManagement Component", () => {
    it("renders ManagerHeader with correct props", () => {
        const onClickBackMock = jest.fn();
        render(<MenuManagement onClickBack={onClickBackMock} />);
        expect(screen.getByTestId("manager-header")).toBeInTheDocument();
    });

    it("renders FoodManagement by default", () => {
        render(<MenuManagement onClickBack={() => {}} />);
        expect(screen.getByTestId("food-management")).toBeInTheDocument();
    });

    it("switches to DetailManagement when 'Details' tab is clicked", () => {
        render(<MenuManagement onClickBack={() => {}} />);
        fireEvent.click(screen.getByText("Details"));
        expect(screen.getByTestId("detail-management")).toBeInTheDocument();
    });

    it("switches to IngredientManagement when 'Ingrédients' tab is clicked", () => {
        render(<MenuManagement onClickBack={() => {}} />);
        fireEvent.click(screen.getByText("Ingrédients"));
        expect(screen.getByTestId("ingredient-management")).toBeInTheDocument();
    });

    it("switches to FoodCategoryManagement when 'Catégories' tab is clicked", () => {
        render(<MenuManagement onClickBack={() => {}} />);
        fireEvent.click(screen.getByText("Catégories"));
        expect(screen.getByTestId("food-category-management")).toBeInTheDocument();
    });
});