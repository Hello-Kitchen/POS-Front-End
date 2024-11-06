import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodButton from '../../Components/FoodButton/FoodButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock('../../Components/FoodStick/FoodStick', () => ({ color }) => (
    <div data-testid="food-stick" style={{ backgroundColor: color }} />
));

describe('FoodButton', () => {
    const props = {
        id: 2,
        name: 'Burger Miam',
        color: 'purple',
        food: {details: [], ingredients: []},
        route: '/category/0/2',
    };

    test('renders', () => {
        render(<FoodButton {...props} />);

        expect(screen.getByText('Burger Miam')).toBeInTheDocument();

        const foodStick = screen.getByTestId('food-stick');
        expect(foodStick).toHaveStyle('background-color: purple');

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});
