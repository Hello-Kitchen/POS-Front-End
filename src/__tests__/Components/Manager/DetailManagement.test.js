/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailManagement from '../../../Components/Manager/MenuManagement/DetailManagement';

jest.mock('../../../Components/Manager/MenuManagement/SideViewDetail', () => () => <div data-testid="side-view-detail" />);
jest.mock('@mui/x-data-grid', () => ({
    DataGrid: (props) => <div data-testid="data-grid" {...props} />,
    GridToolbarContainer: ({ children }) => <div data-testid="grid-toolbar">{children}</div>,
    GridActionsCellItem: ({ icon, label, onClick }) => (
        <button data-testid={`grid-action-${label}`} onClick={onClick}>
            {icon}
        </button>
    ),
}));

global.fetch = jest.fn();

describe('DetailManagement Component', () => {
    const mockSetAlert = jest.fn();

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <DetailManagement setAlert={mockSetAlert} />
            </BrowserRouter>
        );

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch.mockResolvedValue({
            status: 200,
            json: jest.fn().mockResolvedValue([]),
        });
    });

    test('fetches and displays data on mount', async () => {
        const mockDetails = [{ id: 1, name: 'Detail 1', multiple: false }];
        global.fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValue(mockDetails),
        });

        renderComponent();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/details'),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: expect.stringContaining('Bearer'),
                    }),
                })
            );
        });
    });
});