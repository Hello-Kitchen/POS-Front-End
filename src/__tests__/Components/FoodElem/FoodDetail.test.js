import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FoodDetail from '../../../Components/FoodElem/FoodDetail/FoodDetail';

describe('FoodDetail Component', () => {
    const mockSetOrderDetails = jest.fn();

    const defaultProps = {
        name: 'Accompagnement',
        data: [
            {"type":"text","name":"Frite"},
            {"type":"text","name":"Salade"},
            {"type":"text","name":"Riz"},
            {"type":"text","name":"Pâtes"},
        ],
        multiple: true,
        orderDetails: {
            details: [],
            sups: [],
        },
        setOrderDetails: mockSetOrderDetails,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders component', () => {
        const { getByText } = render(<FoodDetail {...defaultProps} />);

        expect(getByText('Accompagnement')).toBeInTheDocument();
        defaultProps.data.forEach((item) => {
            expect(getByText(item.name)).toBeInTheDocument();
        });
    });

    test('initializes data with orderDetails', () => {
        const customProps = {
            ...defaultProps,
            orderDetails: {
                details: [{name: 'Accompagnement', list: [{"type":"text","name":"Riz"}]}],
                sups: [],
            },
        };

        const { getByText } = render(<FoodDetail {...customProps} />);

        const selectedButton = getByText('Riz').closest('div');
        expect(selectedButton).toHaveClass('bg-kitchen-food-detail h-20 col-span-1 border border-white');
    });

    test('handles selection', () => {
        const singleChoiceProps = {...defaultProps, multiple: false};
        const { getByText } = render(<FoodDetail {...singleChoiceProps} />);

        const selectedButton = getByText('Riz').closest('button');
        const secondButton = getByText('Frite').closest('button');

        fireEvent.click(selectedButton);
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{name: 'Accompagnement', list: ['Riz']}],
            sups: [],
        });

        fireEvent.click(secondButton);
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{name: 'Accompagnement', list: ['Frite']}],
            sups: [],
        });
    });

    test('handles multiple selection', () => {
        const { getByText } = render(<FoodDetail {...defaultProps} />);

        const firstButton = getByText('Riz').closest('button');
        const secondButton = getByText('Frite').closest('button');

        fireEvent.click(firstButton);
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{name: 'Accompagnement', list: ['Riz']}],
            sups: [],
        });

        fireEvent.click(secondButton);
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{name: 'Accompagnement', list: ['Frite', 'Riz']}],
            sups: [],
        });

        fireEvent.click(firstButton);
        expect(mockSetOrderDetails).toHaveBeenCalledWith({
            details: [{name: 'Accompagnement', list: ['Frite']}],
            sups: [],
        });
    });

    test('updates color', () => {
        const { getByText } = render(<FoodDetail {...defaultProps} />);

        const firstButton = getByText('Riz').closest('div');
        const secondButton = getByText('Frite').closest('div');

        expect(firstButton).toHaveClass('bg-kitchen-food-detail');
        expect(secondButton).toHaveClass('bg-kitchen-food-detail');

        fireEvent.click(firstButton.querySelector('button'));
        expect(firstButton).toHaveClass('bg-kitchen-food-detail-selected');
        expect(secondButton).toHaveClass('bg-kitchen-food-detail');
    });
});
