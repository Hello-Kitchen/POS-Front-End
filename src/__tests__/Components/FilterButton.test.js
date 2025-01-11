import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterButton from '../../Components/OrdersView/FilterButton';

describe('FilterButton Component', () => {
    test('renders with correct text', () => {
        const { getByText } = render(<FilterButton text="Test Button" />);
        expect(getByText('Test Button')).toBeInTheDocument();
    });

    test('applies selected styles when selected prop is true', () => {
        const { getByText } = render(<FilterButton text="Test Button" selected={true} />);
        const button = getByText('Test Button');
        expect(button).toHaveClass('bg-kitchen-yellow text-kitchen-blue font-semibold border-kitchen-yellow');
    });

    test('applies hovered styles when hovered', () => {
        const { getByText } = render(<FilterButton text="Test Button" />);
        const button = getByText('Test Button');
        fireEvent.mouseEnter(button);
        expect(button).toHaveClass('bg-kitchen-blue text-kitchen-yellow border-kitchen-blue');
        fireEvent.mouseLeave(button);
        expect(button).toHaveClass('bg-white border-kitchen-yellow');
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<FilterButton text="Test Button" onClick={handleClick} />);
        const button = getByText('Test Button');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});