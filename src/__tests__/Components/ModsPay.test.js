import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModsPay from '../../Components/ModsPay/ModsPay';

//mock for '='
const mockGetElementById = jest.fn();
global.document.getElementById = mockGetElementById;

describe('ModsPay Component', () => {
    let setPayListMock, setPriceLessMock;

    beforeEach(() => {
        setPayListMock = jest.fn();
        setPriceLessMock = jest.fn();
        mockGetElementById.mockReturnValue({
            innerHTML: ''
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders', () => {
        const buttons = ["Titres-Restaurant", "Especes", "CB Montant", "CB Total"];
    
        render(
            <ModsPay
                buttons={buttons}
                setPayList={setPayListMock}
                priceLess={100}
                payList={[]}
                setPriceLess={setPriceLessMock}
            />
        );

        buttons.forEach((button) => {
            expect(screen.getByText(button)).toBeInTheDocument();
        });
    });

    test('updates "=" element', () => {
        const buttons = ["Titres-Restaurant", "Especes", "CB Montant", "CB Total"];
    
        render(
            <ModsPay
                buttons={buttons}
                setPayList={setPayListMock}
                priceLess={100}
                payList={[]}
                setPriceLess={setPriceLessMock}
            />
        );

        const totalButton = screen.getByText('CB Total');
        fireEvent.click(totalButton);

        expect(totalButton).toHaveClass('border-2');
        expect(totalButton).toHaveClass('border-kitchen-blue');
        expect(totalButton).toHaveClass('select-mod');

        expect(mockGetElementById).toHaveBeenCalledWith('=');
        expect(mockGetElementById().innerHTML).toBe('Entrée');
    });

    // test('update payList', () => {
    //     const buttons = ["Titres-Restaurant", "Especes", "CB Montant", "CB Total"];
      
    //     render(
    //       <ModsPay
    //         buttons={buttons}
    //         setPayList={setPayListMock}
    //         priceLess={100}
    //         payList={[]}
    //         setPriceLess={setPriceLessMock}
    //       />
    //     );
      
    //     const totalButton = screen.getByText('CB Total');
    //     fireEvent.click(totalButton);

    //     const expectedDiv = (
    //         <div className='flex flex-row justify-between w-full'>
    //           <div className='text-white font-normal text-20px'>CB Total</div>
    //           <div className='text-white font-normal text-20px'>
    //             100.00 &#10;&#13;€
    //             </div>
    //         </div>
    //       );
    //         expect(setPayListMock).toHaveBeenCalledWith([
    //         expect.arrayContaining([
    //           expectedDiv
    //         ]),
    //       ]);
    //     expect(screen.getByText('CB Total')).toBeInTheDocument();
    //     expect(screen.getByText('100.00€')).toBeInTheDocument();
      
    //     expect(setPriceLessMock).toHaveBeenCalledWith(0);
    //   });

    test('payList empty', () => {
        const buttons = ["Titres-Restaurant", "Especes", "CB Montant", "CB Total"];
    
        render(
            <ModsPay
                buttons={buttons}
                setPayList={setPayListMock}
                priceLess={0}
                payList={[]}
                setPriceLess={setPriceLessMock}
            />
        );

        const totalButton = screen.getByText('CB Total');
        fireEvent.click(totalButton);
        
        expect(setPayListMock).not.toHaveBeenCalled();
    });
});
