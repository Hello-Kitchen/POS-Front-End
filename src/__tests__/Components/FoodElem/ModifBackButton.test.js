import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModifBackButton from '../../../Components/FoodElem/ModifButton/ModifBackButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ModifBackButton Component', () => {
  
    test('renders', () => {
        const { getByText, getByRole } = render(
            <Router>
                <ModifBackButton />
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
                <ModifBackButton />
            </Router>
        );

        const button = getByRole('button');
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test('matches the snapshot', () => {
        const { asFragment } = render(
            <Router>
                <ModifBackButton />
            </Router>
        );

        expect(asFragment()).toMatchSnapshot();
    });
}) ;
