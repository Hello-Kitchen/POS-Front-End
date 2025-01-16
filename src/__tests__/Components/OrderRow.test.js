import React from 'react';
import { render } from '@testing-library/react';
import OrdersRow from '../../Components/OrdersView/OrderRow';

describe('OrdersRow Component', () => {
    test('renders order number, channel, time, and chrono correctly', () => {
        const { getByText } = render(<OrdersRow number="123" channel="Online" time="10:00 AM" chrono="5 mins" />);

        expect(getByText('123')).toBeInTheDocument();
        expect(getByText('- Online')).toBeInTheDocument();
        expect(getByText('10:00 AM')).toBeInTheDocument();
        expect(getByText('- Ouverte depuis 5 mins')).toBeInTheDocument();
    });

    test('renders IoIosArrowForward icon', () => {
        const { container } = render(<OrdersRow number="123" channel="Online" time="10:00 AM" chrono="5 mins" />);
        const icon = container.querySelector('svg');
        
        expect(icon).toBeInTheDocument();
    });
});