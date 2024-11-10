import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../Components/LayoutFooter/LayoutFooter';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock('../../Components/FooterButton/FooterButton', () => ({
    table: () => <div>Table Button</div>,
    commandes: () => <div>Commandes Button</div>,
    transactions: () => <div>Transactions Button</div>,
    manager: () => <div>Manager Button</div>,
}));

describe('Footer Component', () => {
    let setConfig, setOrders, navigate;

    beforeEach(() => {
        setConfig = jest.fn();
        setOrders = jest.fn();
      
        navigate = useNavigate();
        navigate.mockClear();
    });

    test('renders', () => {
        const buttons = ['table', 'commandes', 'transactions', 'manager'];

        render(
            <Footer
                buttons={buttons}
                price="20"
                priceLess={0}
                config={{ payement: false }}
                setConfig={setConfig}
                setOrders={setOrders}
            />
        );

        buttons.forEach(buttonKey => {
            expect(screen.getByText(`${buttonKey.charAt(0).toUpperCase() + buttonKey.slice(1)} Button`)).toBeInTheDocument();
        });
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
            />
        );

        const terminéeButton = screen.getByText('Terminée');
        fireEvent.click(terminéeButton);

        expect(setOrders).toHaveBeenCalledWith([{nb: "42"}, [], {id_restaurant: 4}, {channel: "En salle"}]);
    });
});
