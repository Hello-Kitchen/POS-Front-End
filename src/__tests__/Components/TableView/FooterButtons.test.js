/* eslint-disable react/display-name */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterButton from "../../../Components/TablesView/FooterButtons";

jest.mock('../../../Components/TablesView/CustomImage', () => () => <div data-testid="custom-image" />);

describe('FooterButton Component', () => {
    let setActiveButtonMock;

    beforeEach(() => {
        setActiveButtonMock = jest.fn();
    });

    test('renders', () => {
        render(<FooterButton url="test.png" type="Test" activeButton="None" setActiveButton={setActiveButtonMock} />);
        
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls setActiveButton with type', () => {
        render(<FooterButton url="test.png" type="Test" activeButton="None" setActiveButton={setActiveButtonMock} />);
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        
        expect(setActiveButtonMock).toHaveBeenCalledWith("Test");
    });

    test('calls setActiveButton with "None"', () => {
        render(<FooterButton url="test.png" type="Test" activeButton="Test" setActiveButton={setActiveButtonMock} />);
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        
        expect(setActiveButtonMock).toHaveBeenCalledWith("None");
    });
});
