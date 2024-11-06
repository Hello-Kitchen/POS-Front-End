import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OptionsPay from '../../Components/OptionsPay/OptionsPay';

describe('OptionsPay Component', () => {
    const buttonsMock = [
        {name: 'Pay with Cash', func: jest.fn()},
        {name: 'Pay with Card', func: jest.fn()}
    ];

    test('renders', () => {
        render(<OptionsPay buttons={buttonsMock} />);
  
        buttonsMock.forEach(button => {
            expect(screen.getByText(button.name)).toHaveTextContent(button.name);
        });
    });

    test('triggers function', () => {
        render(<OptionsPay buttons={buttonsMock} />);

        fireEvent.click(screen.getByText('Pay with Cash'));
        expect(buttonsMock[0].func).toHaveBeenCalled();
        
        fireEvent.click(screen.getByText('Pay with Card'));
        expect(buttonsMock[1].func).toHaveBeenCalled();
    });


    test('correct styles', () => {
        render(<OptionsPay buttons={buttonsMock} />);

        buttonsMock.forEach(button => {
            const buttonElement = screen.getByText(button.name);

            expect(buttonElement).toHaveClass('border-none');
            expect(buttonElement).toHaveClass('bg-kitchen-yellow');
            expect(buttonElement).toHaveClass('text-2xl');
            expect(buttonElement).toHaveClass('text-kitchen-blue');
            expect(buttonElement).toHaveClass('font-bold');
            expect(buttonElement).toHaveClass('rounded-3xl');
            expect(buttonElement).toHaveClass('outline-none');
            expect(buttonElement).toHaveClass('shadow-md');
            expect(buttonElement).toHaveClass('cursor-pointer');
            expect(buttonElement).toHaveClass('text-center');
        });
    });
});
