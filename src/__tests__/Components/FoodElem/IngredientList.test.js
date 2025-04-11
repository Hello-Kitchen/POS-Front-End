import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientList from '../../../Components/FoodElem/Ingredientlist/IngredientList';

describe('IngredientList Component', () => {
  const mockData = [
    'Salade',
    'Tomate',
    'Ognion',
  ];

  const mockOrderDetails = {
    details: '',
    sups: [],
  };

  const mockSetOrderDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render', () => {
    render(<IngredientList data={mockData} orderDetails={mockOrderDetails} setOrderDetails={mockSetOrderDetails} />);
  });

  test('Supplément button', () => {
    render(<IngredientList data={mockData} orderDetails={mockOrderDetails} setOrderDetails={mockSetOrderDetails} />);

    const supplementButton = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(supplementButton);

    expect(mockSetOrderDetails).toHaveBeenCalledTimes(1);
    expect(mockSetOrderDetails).toHaveBeenCalledWith({
      details: '',
      sups: ['Supplément Salade'],
    });
  });

  test('Retirer button', () => {
    render(<IngredientList data={mockData} orderDetails={mockOrderDetails} setOrderDetails={mockSetOrderDetails} />);

    const retirerButton = screen.getAllByRole('button', { name: '-' })[0];
    fireEvent.click(retirerButton);

    expect(mockSetOrderDetails).toHaveBeenCalledTimes(1);
    expect(mockSetOrderDetails).toHaveBeenCalledWith({
      details: '',
      sups: ['Retirer Salade'],
    });
  });

  test('Allergie button', () => {
    render(<IngredientList data={mockData} orderDetails={mockOrderDetails} setOrderDetails={mockSetOrderDetails} />);

    const allergieButton = screen.getAllByRole('button', { name: 'Allergie' })[0];
    fireEvent.click(allergieButton);

    expect(mockSetOrderDetails).toHaveBeenCalledTimes(1);
    expect(mockSetOrderDetails).toHaveBeenCalledWith({
      details: '',
      sups: ['Allergie Salade'],
    });
  });

  test('duplicates', () => {
    const modifiedOrderDetails = {
      details: '',
      sups: ['Supplément Salade'],
    };

    render(<IngredientList data={mockData} orderDetails={modifiedOrderDetails} setOrderDetails={mockSetOrderDetails} />);

    const supplementButton = screen.getAllByRole('button', { name: '-' })[0];
    fireEvent.click(supplementButton);

    expect(mockSetOrderDetails).toHaveBeenCalledWith({
      details: '',
      sups: ['Retirer Salade'],
    });
  });
});
