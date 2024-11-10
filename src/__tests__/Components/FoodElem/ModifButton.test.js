import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModifButton from '../../../Components/FoodElem/ModifButton/ModifButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ModifButton Component', () => {
    const mockFood = { id: 1, name: 'Pizza', description: 'Delicious pizza' };
    const mockColor = 'red';

    test('renders', () => {
        const { getByText, getByRole } = render(
            <Router>
                <ModifButton food={mockFood} color={mockColor} />
            </Router>
        );
      
        expect(getByText('Modifications')).toBeInTheDocument();
      
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
      
        const icon = button.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    test('navigate', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { getByRole } = render(
            <Router>
                <ModifButton food={mockFood} color={mockColor} />
            </Router>
        );

        const button = getByRole('button');
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith('modification', {
            state: {food: mockFood, color: mockColor}
        });
    });

    test('matches the snapshot', () => {
        const { asFragment } = render(
            <Router>
                <ModifButton food={mockFood} color={mockColor} />
            </Router>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
