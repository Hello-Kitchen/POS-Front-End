import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrentCommand from '../../Components/CurrentCommand/CurrentCommand';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ id: '123' }),
  })
);

describe('CurrentCommand', () => {
    const mockSetOrders = jest.fn();
    const mockSetConfig = jest.fn();

    const orders = [
        {nb: 1},
        [
            {
                food: 2,
                name: "Burger Miam",
                price: 17.99,
                details: ['Frites'],
                mods_ingredients: ['ADD Fromage'],
                number: 1,
                category: 1,
                stop: false
            },
        ],
        {channel: "En Salle"},
        {orderId: null}
    ];
    const config = {
        firstSend: true,
        payement: false,
    };
    const price = 17.99;
    const priceLess = 0;
    const payList = [];

    test('renders', () => {

        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );

        expect(screen.getByText('Table 1')).toBeInTheDocument();
        expect(screen.getByText('1x Burger Miam')).toBeInTheDocument();
        expect(screen.getByText('17.99€')).toBeInTheDocument();

        const stopButton = screen.getByText('STOP');
        const sendButton = screen.getByText('Envoyer');
        expect(stopButton).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();
    });

    test('displays edit buttons', () => {
        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );
        const foodName = screen.getByText('1x Burger Miam');
        fireEvent.click(foodName);

        expect(screen.getByText('Modifier')).toBeInTheDocument();
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    test('increments quantity', () => {
        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );
        fireEvent.click(screen.getByText('1x Burger Miam'));
        fireEvent.click(screen.getByText('+'));
        expect(mockSetOrders).toHaveBeenCalledTimes(1);
    });

    test('decrements quantity', () => {
        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );

        fireEvent.click(screen.getByText('1x Burger Miam'));
        fireEvent.click(screen.getByText('-'));
        expect(mockSetOrders).toHaveBeenCalledTimes(2);
    });

    test('opens modification', () => {
        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );
        fireEvent.click(screen.getByText('1x Burger Miam'));
        fireEvent.click(screen.getByText('Modifier'));
        expect(screen.getByText('Modifier')).toBeInTheDocument();
    });

    test('call `sendFirstOrder`', async () => {

        render(
            <CurrentCommand
                orders={orders}
                config={config}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );

        const sendButton = screen.getByText('Envoyer');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(
                `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/1/orders/`,
                expect.objectContaining({
                    method: 'POST',
                    body: expect.any(String),
                })
            );
        });
    });

    test('show config.payement = true', () => {
        const updatedConfig = {...config, payement: true};

        render(
            <CurrentCommand
                orders={orders}
                config={updatedConfig}
                setConfig={mockSetConfig}
                setOrders={mockSetOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
            />
        );

        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Reste a payer')).toBeInTheDocument();
        expect(screen.getByText('0.00€')).toBeInTheDocument();
    });
});
