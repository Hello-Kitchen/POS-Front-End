import React from 'react';
import { render } from '@testing-library/react';
import FoodStick from '../../Components/FoodStick/FoodStick';

describe('FoodStick', () => {
    test('renders', () => {

        const { container } = render(<FoodStick color="red" />);

        const div = container.firstChild;
        expect(div).toHaveClass('red');
        expect(div).toHaveClass('col-span-1');
        expect(div).toHaveClass('mt-2');
        expect(div).toHaveClass('mb-2');
        expect(div).toHaveClass('ml-1');
        expect(div).toHaveClass('mr-4');
        expect(div).toHaveClass('rounded');
    });
});
