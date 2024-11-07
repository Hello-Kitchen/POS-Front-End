import React from 'react';
import { render } from '@testing-library/react';
import DetailList from '../../../Components/FoodElem/DetailList/DetailList';
import FoodDetail from '../../../Components/FoodElem/FoodDetail/FoodDetail';

jest.mock('../../../Components/FoodElem/FoodDetail/FoodDetail', () => {
    return jest.fn(() => <div>Mocked FoodDetail</div>);
});

describe('DetailList Component', () => {
    let setOrderDetails, orderDetails, details;

    beforeEach(() => {
        setOrderDetails = jest.fn();
        orderDetails = {details: [], sups: {current: 0, list: []}};
        details = [
            {id: 1, name: 'Accompagnement', data: ["Frite", "Salade", "Pâte", "Riz", "Semoule"], multiple: false},
            {id: 2, name: 'Sauce', data: ["Ketchup", "Mayonnaise", "Biggy", "Sauce du Chef"], multiple: true},
        ];
    });

    test('renders without details', () => {
        const { container } = render(
            <DetailList 
                details={[]}
                orderDetails={orderDetails} 
                setOrderDetails={setOrderDetails} 
            />
        );

        expect(container).toBeInTheDocument();
        expect(FoodDetail).not.toHaveBeenCalled();
    });

    test('renders each FoodDetail', () => {
        render(
            <DetailList 
                details={details} 
                orderDetails={orderDetails} 
                setOrderDetails={setOrderDetails} 
            />
        );
        expect(FoodDetail).toHaveBeenCalledWith(
            expect.objectContaining({
                name: details[0].name,
                data: details[0].data,
                multiple: details[0].multiple,
                orderDetails: orderDetails,
                setOrderDetails: setOrderDetails,
            }),
            {}
        );
        expect(FoodDetail).toHaveBeenCalledWith(
            expect.objectContaining({
                name: details[1].name,
                data: details[1].data,
                multiple: details[1].multiple,
                orderDetails: orderDetails,
                setOrderDetails: setOrderDetails,
            }),
            {}
        );
        expect(FoodDetail).toHaveBeenCalledTimes(2);
    });
});
