import React from 'react';
import { render } from '@testing-library/react';
import FoodHeader from '../../../Components/FoodElem/FoodHeader/FoodHeader';

describe('FoodHeader Component', () => {

    test('renders', () => {
        const { getByText } = render(<FoodHeader name="Burger" price={10} color="red" />);
    
        expect(getByText('Burger')).toBeInTheDocument();
        expect(getByText('10€')).toBeInTheDocument();
    });
});
