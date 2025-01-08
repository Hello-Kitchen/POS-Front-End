import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModifButton from '../../../Components/FoodElem/ModifButton/ModifButton';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ModifButton Component', () => {
    const mockFood = { id: 1, name: 'Pizza', description: 'Delicious pizza' };
    const mockFoods = ['Burger Miam', 'Burger Gourmet'];
    const mockColor = 'red';

    test('renders', () => {
        const { getByText, getByRole } = render(
            <Router>
                <ModifButton food={mockFood} foods={mockFoods} color={mockColor} />
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
                <ModifButton food={mockFood} foods={mockFoods} color={mockColor} />
            </Router>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
