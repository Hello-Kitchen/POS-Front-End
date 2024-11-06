import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IngredientList from '../../../Components/FoodElem/Ingredientlist/IngredientList';

describe('IngredientList Component', () => {
    let setOrderDetails, setButtonSelected, orderDetails, buttonSelected, data;

    beforeEach(() => {
        setOrderDetails = jest.fn();
        setButtonSelected = jest.fn();
        orderDetails = {
            details: {},
            sups: {current: 0, list: [{value: 'Allergie', done: false}]}
        };
        buttonSelected = {active: true, same: false};
        data = [
            {id: 0, name: "Steak", price: 4},
            {id: 1, price: 0.3, name: "Pain"},
            {id: 2, price: 0.1, name: "Salade"},
            {id: 3, price: 0.15, name: "Tomate"},
            {id: 4, price: 0.2, name: "Oignon"},
            {id: 5, price: 0.2, name: "Fromage"}
        ];
    });

    test('renders', () => {
        const { getByText } = render(
            <IngredientList 
                data={data}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected} 
            />
        );

        expect(getByText('Steak')).toBeInTheDocument();
        expect(getByText('Pain')).toBeInTheDocument();
        expect(getByText('Salade')).toBeInTheDocument();
        expect(getByText('Tomate')).toBeInTheDocument();
        expect(getByText('Oignon')).toBeInTheDocument();
        expect(getByText('Fromage')).toBeInTheDocument();
    });

    test('updates orderDetails', () => {
        const { getByText } = render(
            <IngredientList 
                data={data}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected} 
            />
        );

        fireEvent.click(getByText('Fromage'));

        expect(setOrderDetails).toHaveBeenCalledWith({
            details: orderDetails.details,
            sups: {current: 1, list: [{value: 'Allergie Fromage', done: true}]}
        });
        expect(setButtonSelected).toHaveBeenCalledWith({active: true, same: true});
    });

    test('ingredient selection', () => {
        const { getByText } = render(
            <IngredientList 
                data={data}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected} 
            />
        );

        fireEvent.click(getByText('Fromage'));

        expect(setOrderDetails).toHaveBeenCalledTimes(1);
        expect(setButtonSelected).toHaveBeenCalledWith({active: true, same: true});
    });

    test('updates styles', () => {
        buttonSelected = {active: true, same: false};
        const { getByText } = render(
            <IngredientList 
                data={data}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected} 
            />
        );

        const selectedButton = getByText('Fromage').closest('div');
        fireEvent.click(getByText('Fromage'));
        expect(selectedButton).toHaveClass('bg-kitchen-food-detail-selected');
    });
});
