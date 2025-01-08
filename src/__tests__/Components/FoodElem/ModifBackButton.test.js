import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModifBackButton from '../../../Components/FoodElem/ModifButton/ModifBackButton';

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

    test('matches the snapshot', () => {
        const { asFragment } = render(
            <Router>
                <ModifBackButton />
            </Router>
        );

        expect(asFragment()).toMatchSnapshot();
    });
}) ;
