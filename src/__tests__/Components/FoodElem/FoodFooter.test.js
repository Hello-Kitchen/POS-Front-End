import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodFooter from '../../../Components/FoodElem/FoodFooter/FoodFooter';

const mockSetOrders = jest.fn();
const mockSetOrderDetails = jest.fn();
const mockCloseDetail = jest.fn();
const mockSetInEdit = jest.fn();

describe('FoodFooter Component', () => {
    const mockFood = {
        id: 1,
        name: 'Pizza',
        price: 10,
        id_category: 3
    };

    const mockOrderDetails = {
        details: [{ list: ['Extra Cheese'] }],
        sups: ['Supplément Olives']
    };

    const renderComponent = (inEdit = false) => {
        render(
            <FoodFooter
                food={mockFood}
                setOrders={mockSetOrders}
                orderDetails={mockOrderDetails}
                setOrderDetails={mockSetOrderDetails}
                closeDetail={mockCloseDetail}
                inEdit={inEdit}
                setInEdit={mockSetInEdit}
            />
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with "Ajouter" button when not in edit mode', () => {
        renderComponent();
        expect(screen.getByText('Ajouter')).toBeInTheDocument();
    });

    it('renders correctly with "Modifier" button when in edit mode', () => {
        renderComponent(true);
        expect(screen.getByText('Modifier')).toBeInTheDocument();
    });

    it('calls handleBackClick and resets state when Annuler is clicked', () => {
        renderComponent();

        fireEvent.click(screen.getByText('Annuler'));

        expect(mockSetOrders).toHaveBeenCalled();
        expect(mockSetOrderDetails).toHaveBeenCalledWith({ details: [], sups: [] });
        expect(mockSetInEdit).toHaveBeenCalledWith(false);
        expect(mockCloseDetail).toHaveBeenCalled();
    });

    it('calls addToOrder and updates state when Ajouter is clicked', () => {
        renderComponent();

        fireEvent.click(screen.getByText('Ajouter'));

        expect(mockSetOrders).toHaveBeenCalled();
        expect(mockSetOrderDetails).toHaveBeenCalledWith({ details: [], sups: [] });
        expect(mockSetInEdit).toHaveBeenCalledWith(false);
        expect(mockCloseDetail).toHaveBeenCalled();
    });

    it('calls addToOrder and updates existing order in edit mode', () => {
        renderComponent(true);

        fireEvent.click(screen.getByText('Modifier'));

        expect(mockSetOrders).toHaveBeenCalled();
        expect(mockSetOrderDetails).toHaveBeenCalledWith({ details: [], sups: [] });
        expect(mockSetInEdit).toHaveBeenCalledWith(false);
        expect(mockCloseDetail).toHaveBeenCalled();
    });
});
