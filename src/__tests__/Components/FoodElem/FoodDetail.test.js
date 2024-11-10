import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodDetail from '../../../Components/FoodElem/FoodDetail/FoodDetail';

describe('FoodDetail Component', () => {
    const mockSetOrderDetails = jest.fn();
    const name = "Accompagnement";
    const data = ["Frite", "Salade", "Riz", "Pâte", "Semoule"];
    const orderDetails = {details: [], sups: []};

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders FoodDetail', () => {
        render(
            <FoodDetail 
                name={name}
                data={data}
                multiple={false}
                orderDetails={orderDetails}
                setOrderDetails={mockSetOrderDetails}
            />
        );

        expect(screen.getByText(name)).toBeInTheDocument();
        data.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test('updates an option when multiple = false', () => {
        render(
            <FoodDetail 
                name={name}
                data={data}
                multiple={false}
                orderDetails={orderDetails}
                setOrderDetails={mockSetOrderDetails}
            />
        );

        const selectedButton = screen.getByText("Frite").closest('div');
        fireEvent.click(selectedButton.querySelector('button'));

        expect(selectedButton).toHaveClass('bg-kitchen-food-detail-selected');
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{ name: name, list: ["Frite"] }],
            sups: []
        });
    });

    test('updates an option when mutiple = true', () => {
        render(
            <FoodDetail 
                name={name}
                data={data}
                multiple={true}
                orderDetails={orderDetails}
                setOrderDetails={mockSetOrderDetails}
            />
        );

        const firstButton = screen.getByText("Frite").closest('div');
        fireEvent.click(firstButton.querySelector('button'));

        const secondButton = screen.getByText("Semoule").closest('div');
        fireEvent.click(secondButton.querySelector('button'));

        expect(firstButton).toHaveClass('bg-kitchen-food-detail-selected');
        expect(secondButton).toHaveClass('bg-kitchen-food-detail-selected');

        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{ name: name, list: expect.arrayContaining(["Frite"]) }],
            sups: []
        });
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{ name: name, list: expect.arrayContaining(["Semoule"]) }],
            sups: []
        });
    });

    test('deselects an option', () => {
        const orderDetailsWithSelection = { 
            details: [{ name: name, list: ["Frite"] }], 
            sups: [] 
        };

        render(
            <FoodDetail 
                name={name}
                data={data}
                multiple={false}
                orderDetails={orderDetailsWithSelection}
                setOrderDetails={mockSetOrderDetails}
            />
        );

        const selectedButton = screen.getByText("Frite").closest('div');
        expect(selectedButton).toHaveClass('bg-kitchen-food-detail-selected');
        fireEvent.click(selectedButton.querySelector('button'));

        expect(selectedButton).toHaveClass('bg-kitchen-food-detail');
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{ name: name, list: [] }],
            sups: []
        });
    });
});