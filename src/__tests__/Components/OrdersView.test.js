import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrdersView from '../../Components/OrdersView/OrdersView';

describe('OrdersView Component', () => {
    const mockOrderSelect = jest.fn();

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders OrdersView component', () => {
        render(<OrdersView orderSelect={mockOrderSelect} />);
        expect(screen.getByText('Commandes en cours')).toBeInTheDocument();
    });

    test('filters past and current orders', async () => {
        const orders = [
            { id: '1', number: 'Table 1', channel: 'Sur place', date: new Date().toISOString(), payment: false },
            { id: '2', number: 'N°2', channel: 'A emporter', date: new Date().toISOString(), payment: {value:[{type:'cb', value: '15'}]} },
        ];
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(orders),
            })
        );
        render(<OrdersView orderSelect={mockOrderSelect} />);

        expect(await screen.findByText('Table 1')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Commandes en cours'));
        expect(screen.getByText('N°2')).toBeInTheDocument();
    });

    test('filters orders by channel', async () => {
        const orders = [
            { id: '1', number: 'Table 1', channel: 'Sur place', date: new Date().toISOString(), payment: false },
            { id: '2', number: 'N°2', channel: 'A emporter', date: new Date().toISOString(), payment: false },
        ];
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(orders),
            })
        );
        render(<OrdersView orderSelect={mockOrderSelect} />);

        expect(await screen.findByText('Table 1')).toBeInTheDocument();
        expect(screen.getByText('N°2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Sur place'));
        expect(screen.getByText('Table 1')).toBeInTheDocument();
        expect(screen.queryByText('N°2')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('A emporter'));
        expect(screen.queryByText('Table 1')).not.toBeInTheDocument();
        expect(screen.getByText('N°2')).toBeInTheDocument();
    });

    test('calls orderSelect when an order is clicked', async () => {
        const orders = [
            { id: '1', number: 'Table 1', channel: 'Sur place', date: new Date().toISOString(), served: false },
        ];
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(orders),
            })
        );
        render(<OrdersView orderSelect={mockOrderSelect} />);

        const orderElement = await screen.findByText('Table 1');
        fireEvent.click(orderElement);
        expect(mockOrderSelect).toHaveBeenCalledWith('1');
    });
});