/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuListLine from '../../Components/MenuListLine/MenuListLine';

describe('MenuListLine Component', () => {
    it('renders the title correctly', () => {
        render(<MenuListLine title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('calls onClick when the component is clicked', () => {
        const handleClick = jest.fn();
        render(<MenuListLine title="Test Title" onClick={handleClick} />);
        fireEvent.click(screen.getByText('Test Title'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });


    it('does not render separators when both separatorTop and separatorBottom are false', () => {
        render(<MenuListLine title="Test Title" separatorTop={false} separatorBottom={false} />);
        const separators = screen.queryAllByRole('separator');
        expect(separators.length).toBe(0);
    });
});