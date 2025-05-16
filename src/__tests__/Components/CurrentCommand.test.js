import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrentCommand from '../../Components/CurrentCommand/CurrentCommand';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ id: '123', tables: [] }),
  })
);

describe('CurrentCommand', () => {
    const mockSetOrders = jest.fn();
    const mockSetConfig = jest.fn();
    const mockSetBoard = jest.fn();

    const orders = {
        number: "Table 42",
        channel: "Sur place",
        orderId: null,
        food: [
            {
                food: 2,
                name: "Burger Miam",
                price: 17.99,
                details: ['Frites'],
                mods_ingredients: [{ type: "ADD", ingredient: "Fromage" }],
                number: 1,
                category: 1,
                stop: false
            },
        ],
        tmp: {}
      }

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
                setBoard={mockSetBoard}
            />
        );

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
                setBoard={mockSetBoard}
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
                setBoard={mockSetBoard}
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
                setBoard={mockSetBoard}
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
                setBoard={mockSetBoard}
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
                setBoard={mockSetBoard}
            />
        );

        const sendButton = screen.getByText('Envoyer');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/1/orders${orders.tableId ? `?idTable=${orders.tableId}` : ''}`,
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
                setBoard={mockSetBoard}
            />
        );

        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Reste a payer')).toBeInTheDocument();
        expect(screen.getByText('0.00€')).toBeInTheDocument();
    });

    test('renders Food component with correct name and price', () => {
        render(<CurrentCommand orders={orders} config={config} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        expect(screen.getByText('1x Burger Miam')).toBeInTheDocument();
        expect(screen.getByText('17.99€')).toBeInTheDocument();
    });

    test('renders Detail component with correct details', () => {
        render(<CurrentCommand orders={orders} config={config} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        expect(screen.getByText('Frites')).toBeInTheDocument();
    });

    test('renders Sup component with correct supplement', () => {
        render(<CurrentCommand orders={orders} config={config} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        expect(screen.getByText('Supplement Fromage')).toBeInTheDocument();
    });

    test('calls setOrders when STOP button is clicked', () => {
        render(<CurrentCommand orders={orders} config={config} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        const stopButton = screen.getByText('STOP');
        fireEvent.click(stopButton);
        expect(mockSetOrders).toHaveBeenCalled();
    });

    test('renders Footer with payment details when config.payement is true', () => {
        const updatedConfig = { ...config, payement: true };
        render(<CurrentCommand orders={orders} config={updatedConfig} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Reste a payer')).toBeInTheDocument();
        expect(screen.getByText('0.00€')).toBeInTheDocument();
    });

    test('calls sendFirstOrder when Envoyer button is clicked', async () => {
        render(<CurrentCommand orders={orders} config={config} setConfig={mockSetConfig} setOrders={mockSetOrders} price={price} priceLess={priceLess} payList={payList} setBoard={mockSetBoard}/>);
        const sendButton = screen.getByText('Envoyer');
        fireEvent.click(sendButton);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/1/orders${orders.tableId ? `?idTable=${orders.tableId}` : ''}`,
                expect.objectContaining({
                    method: 'POST',
                    body: expect.any(String),
                })
            );
        });
    });
});
