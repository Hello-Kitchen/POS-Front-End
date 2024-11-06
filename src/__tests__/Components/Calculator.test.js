import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../../Components/Calculator/Calculator';
//import '@testing-library/jest-dom/extend-expect';

describe('Calculator Component', () => {
    let setPriceLess;
    let setPayList;
    
    beforeEach(() => {
        setPriceLess = jest.fn();
        setPayList = jest.fn();
        render(
            <Calculator 
                priceLess={100} 
                setPriceLess={setPriceLess} 
                payList={[]} 
                setPayList={setPayList} 
            />
        );
    });

    test('renders', () => {
        const screenValue = screen.getAllByText('0')[0];
        expect(screenValue).toBeInTheDocument();
    });

    test('buttons update', () => {
        const button1 = screen.getByText('1');
        const button2 = screen.getByText('2');
        fireEvent.click(button1);
        fireEvent.click(button2);

        const screenValue = screen.getByText('12');
        expect(screenValue).toBeInTheDocument();
    });

    test('reset', () => {
        const clearButton = screen.getByText('C');
        fireEvent.click(clearButton);

        const screenValue = screen.getAllByText('0')[0];
        expect(screenValue).toBeInTheDocument();
    });

    test('invert', () => {
        const button1 = screen.getByText('1');
        const invertButton = screen.getByText('+-');
        fireEvent.click(button1);
        fireEvent.click(invertButton);

        const screenValue = screen.getByText('-1');
        expect(screenValue).toBeInTheDocument();
    });

    test('percentage', () => {
        const button1 = screen.getByText('1');
        const percentButton = screen.getByText('%');
        fireEvent.click(button1);
        fireEvent.click(percentButton);

        const screenValue = screen.getByText('0.01');
        expect(screenValue).toBeInTheDocument();
    });

    // test('+ operations', () => {
    //     const button1 = screen.getByText('1');
    //     const button2 = screen.getByText('2');
    //     const plusButton = screen.getByText('+');
    //     const equalsButton = screen.getByText('=');

    //     fireEvent.click(button1);
    //     fireEvent.click(button2);
    //     fireEvent.click(plusButton);
    //     fireEvent.click(button1);
    //     fireEvent.click(button2);
    //     fireEvent.click(equalsButton);

    //     const screenValue = screen.getByText('24');
    //     expect(screenValue).toBeInTheDocument();
    // });

    // test('division by zero', () => {
    //     const button1 = screen.getByText('0');
    //     const divideButton = screen.getByText('/');
    //     const equalsButton = screen.getByText('=');

    //     fireEvent.click(button1);
    //     fireEvent.click(divideButton);
    //     fireEvent.click(button1);
    //     fireEvent.click(equalsButton);

    //     const screenValue = screen.getAllByText('0')[0];
    //     expect(screenValue).toBeInTheDocument();
    // });

    // test('equals button handles calculation result correctly', () => {
    //     const button1 = screen.getByText('1');
    //     const button2 = screen.getByText('2');
    //     const plusButton = screen.getByText('+');
    //     const equalsButton = screen.getByText('=');

    //     fireEvent.click(button1);
    //     fireEvent.click(button2);
    //     fireEvent.click(plusButton);
    //     fireEvent.click(button1);
    //     fireEvent.click(button2);
    //     fireEvent.click(equalsButton);

    //     expect(setPriceLess).toHaveBeenCalledWith(76);
    //     expect(setPayList).toHaveBeenCalled();
    // });
});
