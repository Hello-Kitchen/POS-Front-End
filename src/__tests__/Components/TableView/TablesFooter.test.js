/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablesFooter from "../../../Components/TablesView/TablesFooter"

jest.mock('../../../Components/TablesView/FooterButtons', () => ({ type, setActiveButton }) => (
    <button data-testid={`footer-button-${type}`} onClick={() => setActiveButton(type)}>
        {type}
    </button>
));

jest.mock('../../../Components/TablesView/Tables', () => () => <div data-testid="tables-component" />);

describe('TablesFooter Component', () => {
    test('renders correctly', () => {
        render(<TablesFooter />);
        
        expect(screen.getByTestId('footer-button-Fuse')).toBeInTheDocument();
        expect(screen.getByTestId('footer-button-Sep')).toBeInTheDocument();
        expect(screen.getByTestId('footer-button-Edit')).toBeInTheDocument();
    });

    test('displays fuse buttons', () => {
        render(<TablesFooter />);
        
        fireEvent.click(screen.getByTestId('footer-button-Fuse'));
        expect(screen.getByText('Fusionner')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    test('displays sep buttons', () => {
        render(<TablesFooter />);
        
        fireEvent.click(screen.getByTestId('footer-button-Sep'));
        expect(screen.getByText('Séparer')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    test('displays Tables component', () => {
        render(<TablesFooter />);
        
        fireEvent.click(screen.getByTestId('footer-button-Edit'));
        expect(screen.getByTestId('tables-component')).toBeInTheDocument();
    });
});
