import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonSet from '../../Components/FooterButton/FooterButton';

describe('ButtonSet Component', () => {
    // Mock the setConfig function
    const updateActiveTabMock = jest.fn();

    test('renders all buttons with correct text', () => {
        const buttons = ['tables', 'commandes', 'gestion'];

        render(<ButtonSet buttons={buttons} activeTab="" updateActiveTab={updateActiveTabMock} />);

        // Check that each button's text is present
        expect(screen.getByText("TABLES")).toBeInTheDocument();
        expect(screen.getByText("COMMANDES")).toBeInTheDocument();
        expect(screen.getByText("GESTION")).toBeInTheDocument();
    });

    test('Button click triggers updateActiveTab', () => {
        const buttons = ['tables', 'commandes', 'gestion'];

        render(<ButtonSet buttons={buttons} activeTab="" updateActiveTab={updateActiveTabMock} />);

        const buttonTables = screen.getByText("TABLES");
        const buttonCommands = screen.getByText("COMMANDES");

        fireEvent.click(buttonTables);
        fireEvent.click(buttonCommands);

        // Verify that updateActiveTab was called with the correct argument
        expect(updateActiveTabMock).toHaveBeenCalledWith("TABLES");
        expect(updateActiveTabMock).toHaveBeenCalledWith("COMMANDES");
        expect(updateActiveTabMock).not.toHaveBeenCalledWith("GESTION");
    });
});
