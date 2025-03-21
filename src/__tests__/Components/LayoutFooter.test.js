import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../Components/LayoutFooter/LayoutFooter';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('Footer Component', () => {
    let setConfig, setOrders, navigate;

    beforeEach(() => {
        setConfig = jest.fn();
        setOrders = jest.fn();

        navigate = useNavigate();
        navigate.mockClear();
    });

    test('renders buttons based on buttons prop', () => {
        let buttons = ['tables','commandes'];

        const { rerender } = render(
            <Footer
            buttons={buttons}
            price="20"
            priceLess={0}
            config={{ payement: false }}
            setConfig={setConfig}
            setOrders={setOrders}
            activeTab=''
            updateActiveTab={jest.fn()}
            />
        );

        // Verify buttons that are present
        expect(screen.queryByText('TABLES')).toBeInTheDocument();
        expect(screen.queryByText('COMMANDES')).toBeInTheDocument();

        // Add a new button
        buttons.push('gestion');
        rerender(
            <Footer
            buttons={buttons}
            price="20"
            priceLess={0}
            config={{ payement: false }}
            setConfig={setConfig}
            setOrders={setOrders}
            activeTab=''
            updateActiveTab={jest.fn()}
            />
        );

        // Check that the new button is rendered
        expect(screen.queryByText('GESTION')).toBeInTheDocument();
    });

    test('renders unknown button', () => {
        const buttons = ['unknownButton'];

        render(
            <Footer
            buttons={buttons}
            price="20"
            priceLess={0}
            config={{ payement: false }}
            setConfig={setConfig}
            setOrders={setOrders}
            activeTab=''
            updateActiveTab={jest.fn()}
            />
        );
        expect(screen.queryByText('TABLES')).not.toBeInTheDocument();
        expect(screen.queryByText('COMMANDES')).not.toBeInTheDocument();
        expect(screen.queryByText('GESTION')).not.toBeInTheDocument();
    });

    test('Encaisser button priceLess > 0 or payement = false', () => {
        const buttons = [];

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={5}
                config={{ payement: false }}
                setConfig={setConfig}
                setOrders={setOrders}
                activeTab=''
                updateActiveTab={jest.fn()}
            />
        );

        expect(screen.getByText('Encaisser 20.00€')).toBeInTheDocument();
    });

    test('Terminée button priceLess <= 0 and payement = true', () => {
        const buttons = [];

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={0}
                config={{ payement: true }}
                setConfig={setConfig}
                setOrders={setOrders}
                activeTab=''
                updateActiveTab={jest.fn()}
            />
        );

        expect(screen.getByText('Terminée')).toBeInTheDocument();
    });

    test('Encaisser navigate', () => {
        const buttons = [];
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={0}
                config={{ payement: false }}
                setConfig={setConfig}
                setOrders={setOrders}
                activeTab=''
                updateActiveTab={jest.fn()}
            />
        );

        const encaisserButton = screen.getByText('Encaisser 20.00€');
        fireEvent.click(encaisserButton);

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/pay');
    });

    test('Retour navigate', () => {
        const buttons = [];
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={0}
                config={{ payement: true }}
                setConfig={setConfig}
                setOrders={setOrders}
                activeTab=''
                updateActiveTab={jest.fn()}
            />
        );

        const retourButton = screen.getByText('Terminée');
        fireEvent.click(retourButton);

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    test('sets orders when Terminée button is clicked', () => {
        const buttons = [];

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={0}
                config={{ payement: true }}
                setConfig={setConfig}
                setOrders={setOrders}
                activeTab=''
                updateActiveTab={jest.fn()}
            />
        );

        const terminéeButton = screen.getByText('Terminée');
        fireEvent.click(terminéeButton);

        expect(setOrders).toHaveBeenCalledWith([{nb: "42"}, [], {id_restaurant: 4}, {channel: "En salle"}]);
    });

    test("Clear the order when new order button is clicked", () => {
        const mockSetOrders = jest.fn();
        const mockSetConfig = jest.fn();
        const mockSetSelectedOrder = jest.fn();
        const mockButtons = [];
        const mockUpdateActiveTab = jest.fn();

        const { getByTestId } = render(
            <Footer
            buttons={mockButtons}
            price={0}
            config={{ payement: false, firstSend: true, id_order: null }}
            setConfig={mockSetConfig}
            priceLess={0}
            setOrders={mockSetOrders}
            activeTab={0}
            updateActiveTab={mockUpdateActiveTab}
            setSelectedOrder={mockSetSelectedOrder}
            />
          );
      
          // Find the NewTicket element and click on it
          const newTicketElement = getByTestId('new-ticket');
          fireEvent.click(newTicketElement);
      
          // Assert that setOrders and setConfig were called with correct arguments
          expect(mockSetOrders).toHaveBeenCalledWith([{ nb: "42" }, [], { channel: "En salle" }, { orderId: null }]);
          expect(mockSetConfig).toHaveBeenCalledWith({
            payement: false,
            firstSend: true,
            id_order: null
          });
          expect(mockSetSelectedOrder).toHaveBeenCalledWith('');
    });
});
