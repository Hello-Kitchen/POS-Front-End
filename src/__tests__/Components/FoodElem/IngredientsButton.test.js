import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IngredientsButton from '../../../Components/FoodElem/IngredientsButton/IngredientsButton';

describe('IngredientsButton Component', () => {
    let setOrderDetails, setButtonSelected, orderDetails;

    beforeEach(() => {
        setOrderDetails = jest.fn();
        setButtonSelected = jest.fn();
        orderDetails = {
            details: {},
            sups: { current: 0, list: [] }
        };
    });

    test('renders', () => {
        const { getByText } = render(
            <IngredientsButton 
                orderDetails={orderDetails} 
                setOrderDetails={setOrderDetails} 
                setButtonSelected={setButtonSelected} 
            />
        );

        expect(getByText('Supplément')).toBeInTheDocument();
        expect(getByText('Retirer')).toBeInTheDocument();
        expect(getByText('Allergie')).toBeInTheDocument();
        expect(getByText('Note')).toBeInTheDocument();
    });

    test('updates orderDetails', () => {
        const { getByText } = render(
            <IngredientsButton 
                orderDetails={orderDetails} 
                setOrderDetails={setOrderDetails} 
                setButtonSelected={setButtonSelected} 
            />
        );

        fireEvent.click(getByText('Supplément'));

        expect(setOrderDetails).toHaveBeenCalledWith({
            details: orderDetails.details,
            sups: { current: 0, list: [{ value: 'Supplément', done: false }] }
        });
        expect(setButtonSelected).toHaveBeenCalledWith({ active: true, same: false });
    });

    test('one button selected', () => {
        const { getByText } = render(
            <IngredientsButton 
                orderDetails={orderDetails} 
                setOrderDetails={setOrderDetails} 
                setButtonSelected={setButtonSelected} 
            />
        );

        fireEvent.click(getByText('Retirer'));
        expect(setOrderDetails).toHaveBeenCalledWith({
            details: orderDetails.details,
            sups: { current: 0, list: [{ value: 'Retirer', done: false }] }
        });
        fireEvent.click(getByText('Allergie'));
        expect(setOrderDetails).toHaveBeenCalledWith({
            details: orderDetails.details,
            sups: { current: 0, list: [{ value: 'Allergie', done: false }] }
        });

        expect(setOrderDetails).toHaveBeenCalledTimes(2);
        expect(setButtonSelected).toHaveBeenCalledTimes(2);
    });
});
