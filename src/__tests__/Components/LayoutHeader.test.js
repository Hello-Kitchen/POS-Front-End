import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LayoutHeader from '../../Components/LayoutHeader/LayoutHeader';

const mockDate = new Date(2024, 0, 1, 12, 0);
global.Date = jest.fn(() => mockDate);

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

describe('LayoutHeader Component', () => {
    test('renders', () => {
        const textCenter = 'Center Text';
        const textLeft = 'Left Text';

        render(<LayoutHeader textCenter={textCenter} textLeft={textLeft} />);

        expect(screen.getByText(textCenter)).toBeInTheDocument();
        expect(screen.getByText(textLeft)).toBeInTheDocument();
    });

    test('displays date', () => {
        const textCenter = 'Center Text';
        const textLeft = 'Left Text';

        render(<LayoutHeader textCenter={textCenter} textLeft={textLeft} />);

        const formattedDate = '01/01/2024 - 12:00';
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
   });

    // test('updates time', async () => {
    //     const textCenter = 'Center Text';
    //     const textLeft = 'Left Text';

    //     render(<LayoutHeader textCenter={textCenter} textLeft={textLeft} />);

    //     expect(screen.getByText('01/01/2024 - 12:00')).toBeInTheDocument();
    //     jest.useFakeTimers();
    //     jest.advanceTimersByTime(1000);
    //     global.Date.mockImplementationOnce(() => new Date(2024, 0, 1, 12, 1)); 

    //     await waitFor(() => {
    //       expect(screen.getByText('01/01/2024 - 12:01')).toBeInTheDocument();
    //     });
    // });
});
