import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodListHeader from '../../Components/FoodList/FoodListHeader';

describe('FoodListHeader', () => {
    const mockOnBackClick = jest.fn();

    beforeEach(() => {
        mockOnBackClick.mockClear();
    });

    test('renders the FoodListHeader component with the correct name and color', () => {
        render(<FoodListHeader name="Test Name" color="bg-red-500" onBackClick={mockOnBackClick} />);

        const nameElement = screen.getByText('Test Name');
        expect(nameElement).toBeInTheDocument();
        expect(nameElement).toHaveClass('text-white text-3xl font-bold');

        const backButton = screen.getByText('Retour');
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveClass('text-white text-2xl font-semibold');

    });

    test('calls onBackClick when the back button is clicked', () => {
        render(<FoodListHeader name="Test Name" color="bg-red-500" onBackClick={mockOnBackClick} />);

        const backButton = screen.getByText('Retour');
        fireEvent.click(backButton);

        expect(mockOnBackClick).toHaveBeenCalledTimes(1);
    });

});