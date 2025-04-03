import React from 'react';
import { render, screen } from '@testing-library/react';
import LayoutHeader from '../../Components/LayoutHeader/LayoutHeader';

const mockDate = new Date(2024, 0, 1, 12, 0);
global.Date = jest.fn(() => mockDate);

describe('LayoutHeader Component', () => {
    beforeEach(() => {
        localStorage.setItem(
            'userInfo',
            JSON.stringify({ id: '123', firstname: 'John', lastname: 'Doe' })
        );
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders user information', () => {
        const textCenter = 'Center Text';

        render(<LayoutHeader textCenter={textCenter} />);

        expect(screen.getByText('123 - John Doe')).toBeInTheDocument();
    });

    test('renders center text', () => {
        const textCenter = 'Center Text';

        render(<LayoutHeader textCenter={textCenter} />);

        expect(screen.getByText(textCenter)).toBeInTheDocument();
    });

    test('displays formatted date', () => {
        const textCenter = 'Center Text';

        render(<LayoutHeader textCenter={textCenter} />);

        const formattedDate = '01/01/2024 - 12:00';
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

});
