import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserManagemementGrid from '../../../Components/Manager/UserManagement/UserManagemementGrid';

jest.mock('../../../Components/Manager/UserManagement/SideViewUser', () => {
    const MockSideViewUser = () => <div data-testid="side-view-user">SideViewUser</div>;
    MockSideViewUser.displayName = 'MockSideViewUser';
    return MockSideViewUser;
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

global.fetch = jest.fn();

describe('UserManagemementGrid', () => {
    const mockSetAlert = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    it('renders the DataGrid and toolbar', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue([]),
            status: 200,
        });

        render(
            <BrowserRouter>
                <UserManagemementGrid setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        expect(screen.getByText('Ajouter un utilisateur')).toBeInTheDocument();
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    });

    it('displays fetched users in the DataGrid', async () => {
        const mockUsers = [
            { id: 1, username: 'user1', firstname: 'John', lastname: 'Doe' },
            { id: 2, username: 'user2', firstname: 'Jane', lastname: 'Smith' },
        ];

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockUsers),
            status: 200,
        });

        render(
            <BrowserRouter>
                <UserManagemementGrid setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1')).toBeInTheDocument();
            expect(screen.getByText('user2')).toBeInTheDocument();
        });
    });

    it('handles unauthorized access during data fetch', async () => {
        fetch.mockResolvedValueOnce({
            status: 401,
        });

        render(
            <BrowserRouter>
                <UserManagemementGrid setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/', {
                state: { error: 'Unauthorized access. Please log in.' },
            });
        });
    });

    it('opens the side view when a user is selected', async () => {
        const mockUsers = [
            { id: 1, username: 'user1', firstname: 'John', lastname: 'Doe' },
        ];

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockUsers),
            status: 200,
        });

        render(
            <BrowserRouter>
                <UserManagemementGrid setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText('user1')).toBeInTheDocument());

        fireEvent.click(screen.getByLabelText('Users'));

        expect(screen.getByTestId('side-view-user')).toBeInTheDocument();
    });

    it('deletes a user and refreshes the data', async () => {
        const mockUsers = [
            { id: 1, username: 'user1', firstname: 'John', lastname: 'Doe' },
        ];

        fetch
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue(mockUsers),
                status: 200,
            })
            .mockResolvedValueOnce({ status: 200 }) // DELETE request
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue([]),
                status: 200,
            });

        render(
            <BrowserRouter>
                <UserManagemementGrid setAlert={mockSetAlert} />
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText('user1')).toBeInTheDocument());

        fireEvent.click(screen.getByLabelText('Delete'));

        await waitFor(() => {
            expect(mockSetAlert).toHaveBeenCalledWith({
                type: 'success',
                message: 'Elément supprimé avec succès',
            });
            expect(fetch).toHaveBeenCalledTimes(3); // Initial fetch, delete, and refresh fetch
        });
    });
});