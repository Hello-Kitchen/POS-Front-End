import React from 'react';
import { render, screen } from '@testing-library/react';
import buttonComponents from '../../Components/FooterButton/FooterButton';

describe('Button Components', () => {
    test('renders ButtonTables', () => {
        render(<buttonComponents.tables />);

        expect(screen.getByText('TABLES')).toBeInTheDocument();
    });

    test('renders ButtonCommandes', () => {
        render(<buttonComponents.commandes />);

        expect(screen.getByText('COMMANDES')).toBeInTheDocument();
    });

    test('renders ButtonTransactions', () => {
        render(<buttonComponents.transactions />);

        expect(screen.getByText('TRANSACTIONS')).toBeInTheDocument();
    });

    test('renders ButtonManager', () => {
        render(<buttonComponents.manager />);

        expect(screen.getByText('MANAGER')).toBeInTheDocument();
    });
});
