/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FoodFooter from '../../../Components/FoodElem/FoodFooter/FoodFooter';

describe('FoodFooter Component', () => {
    let setOrders, setOrderDetails, orderDetails;

    beforeEach(() => {
        setOrders = jest.fn();
        setOrderDetails = jest.fn();
        orderDetails = {
            details: [],
            sups: {current: 0, list: []}
        };
    });

    const Wrapper = ({ children }) => (
        <MemoryRouter initialEntries={['/category/0/2']}>
            {children}
        </MemoryRouter>
    );

    test('renders', () => {
        const { getByText } = render(
            <Wrapper>
                <FoodFooter 
                    id={2}
                    name="Burger Gourmand"
                    price={17.99}
                    setOrders={setOrders}
                    orderDetails={orderDetails}
                    setOrderDetails={setOrderDetails}
                />
            </Wrapper>
        );

        expect(getByText('Annuler')).toBeInTheDocument();
        expect(getByText('Ajouter')).toBeInTheDocument();
    });

    test('back button', () => {
        const { getByText } = render(
            <Wrapper>
                <FoodFooter 
                    id={2}
                    name="Burger Gourmand"
                    price={17.99}
                    setOrders={setOrders}
                    orderDetails={orderDetails}
                    setOrderDetails={setOrderDetails}
                />
            </Wrapper>
        );

        fireEvent.click(getByText('Annuler'));

        expect(setOrderDetails).toHaveBeenCalledWith({details: [], sups: {current: 0, list: []}});
    });

    test('add button and update', () => {
        orderDetails.details = [{ list: [] }];
        const { getByText } = render(
            <Wrapper>
                <FoodFooter 
                    id={2}
                    name="Burger Gourmand"
                    price={17.99}
                    setOrders={setOrders}
                    orderDetails={orderDetails}
                    setOrderDetails={setOrderDetails}
                />
            </Wrapper>
        );

        fireEvent.click(getByText('Ajouter'));

        expect(setOrders).toHaveBeenCalledWith(expect.any(Function));
    });
});
