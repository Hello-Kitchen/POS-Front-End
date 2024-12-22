import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryButton from '../../Components/CategoryButton/CategoryButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


describe('CategoryButton', () => {
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders', () => {
        const props = {
            id: 0,
            name: 'Plats',
            color: 'red',
            food: ['Burger Miam', 'Burger Gourmet'],
            route: '/category/',
        };

        render(<CategoryButton {...props} />);

        expect(screen.getByText('Plats')).toBeInTheDocument();
    });

    test('navigate', () => {
        const props = {
            id: 0,
            name: 'Plats',
            color: 'red',
            food: ['Burger Miam', 'Burger Gourmet'],
            route: '/category/',
        };

        render(<CategoryButton {...props} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockNavigate).toHaveBeenCalledWith('/category/0', {
            state: { foods: ['Burger Miam', 'Burger Gourmet'], color: 'red'},
        });
    });
});
