import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalNewOrder from '../../Components/LayoutFooter/ModalNewOrder';

describe('ModalNewOrder Component', () => {
  const mockSetModalOpen = jest.fn();
  const mockSetOrders = jest.fn();
  const mockSetConfig = jest.fn();
  const mockSetSelectedOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all three order type buttons', () => {
    const { getByText } = render(
      <ModalNewOrder
        setModalOpen={mockSetModalOpen}
        setOrders={mockSetOrders}
        setConfig={mockSetConfig}
        setSelectedOrder={mockSetSelectedOrder}
      />
    );

    expect(getByText('DIRECT')).toBeInTheDocument();
    expect(getByText('Sur place')).toBeInTheDocument();
    expect(getByText('A emporter')).toBeInTheDocument();
  });

  it('calls the correct functions when DIRECT button is clicked', () => {
    const { getByText } = render(
      <ModalNewOrder
        setModalOpen={mockSetModalOpen}
        setOrders={mockSetOrders}
        setConfig={mockSetConfig}
        setSelectedOrder={mockSetSelectedOrder}
      />
    );

    fireEvent.click(getByText('DIRECT'));

    expect(mockSetOrders).toHaveBeenCalledWith([
      { nb: "DIRECT" },
      [],
      { channel: "DIRECT" },
      { orderId: null }
    ]);
    expect(mockSetConfig).toHaveBeenCalledWith({
      payement: false,
      firstSend: true,
      id_order: null
    });
    expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls the correct functions when "Sur place" button is clicked', () => {
    const { getByText } = render(
      <ModalNewOrder
        setModalOpen={mockSetModalOpen}
        setOrders={mockSetOrders}
        setConfig={mockSetConfig}
        setSelectedOrder={mockSetSelectedOrder}
      />
    );

    fireEvent.click(getByText('Sur place'));

    expect(mockSetOrders).toHaveBeenCalledWith([
      { nb: "" },
      [],
      { channel: "Sur place" },
      { orderId: null }
    ]);
    expect(mockSetConfig).toHaveBeenCalledWith({
      payement: false,
      firstSend: true,
      id_order: null
    });
    expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls the correct functions when "A emporter" button is clicked', () => {
    const { getByText } = render(
      <ModalNewOrder
        setModalOpen={mockSetModalOpen}
        setOrders={mockSetOrders}
        setConfig={mockSetConfig}
        setSelectedOrder={mockSetSelectedOrder}
      />
    );

    fireEvent.click(getByText('A emporter'));

    expect(mockSetOrders).toHaveBeenCalledWith([
      { nb: "" },
      [],
      { channel: "A emporter" },
      { orderId: null }
    ]);
    expect(mockSetConfig).toHaveBeenCalledWith({
      payement: false,
      firstSend: true,
      id_order: null
    });
    expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });

  it('has the correct styling classes', () => {
    const { container, getByText } = render(
      <ModalNewOrder
        setModalOpen={mockSetModalOpen}
        setOrders={mockSetOrders}
        setConfig={mockSetConfig}
        setSelectedOrder={mockSetSelectedOrder}
      />
    );

    const modalContainer = container.firstChild;
    expect(modalContainer).toHaveClass('fixed');
    expect(modalContainer).toHaveClass('flex');
    expect(modalContainer).toHaveClass('justify-center');
    expect(modalContainer).toHaveClass('bottom-[97px]');
    expect(modalContainer).toHaveClass('right-1/4');

    const innerDiv = modalContainer.firstChild;
    expect(innerDiv).toHaveClass('bg-kitchen-blue');
    expect(innerDiv).toHaveClass('rounded-tl-xl');
    expect(innerDiv).toHaveClass('p-2');
    expect(innerDiv).toHaveClass('h-fit');

    const buttons = [
      getByText('DIRECT'),
      getByText('Sur place'),
      getByText('A emporter')
    ];
    
    buttons.forEach(button => {
      expect(button.parentElement).toHaveClass('space-y-2');
      expect(button).toHaveClass('w-80');
      expect(button).toHaveClass('py-3');
      expect(button).toHaveClass('text-center');
      expect(button).toHaveClass('bg-kitchen-yellow');
      expect(button).toHaveClass('rounded-lg');
      expect(button).toHaveClass('text-kitchen-blue');
      expect(button).toHaveClass('text-xl');
      expect(button).toHaveClass('font-bold');
    });
  });
});