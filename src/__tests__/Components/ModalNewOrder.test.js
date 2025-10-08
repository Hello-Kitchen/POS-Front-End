import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ModalNewOrder from "../../Components/LayoutFooter/ModalNewOrder";

describe("ModalNewOrder Component", () => {
	const mockSetModalOpen = jest.fn();
	const mockSetOrders = jest.fn();
	const mockSetConfig = jest.fn();
	const mockSetSelectedOrder = jest.fn();

	const renderComponent = () => {
		render(
			<BrowserRouter>
				<ModalNewOrder
					setModalOpen={mockSetModalOpen}
					setOrders={mockSetOrders}
					setConfig={mockSetConfig}
					setSelectedOrder={mockSetSelectedOrder}
				/>
			</BrowserRouter>,
		);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the component correctly", () => {
		renderComponent();
		expect(screen.getByText("DIRECT")).toBeInTheDocument();
		expect(screen.getByText("Sur place")).toBeInTheDocument();
		expect(screen.getByText("A emporter")).toBeInTheDocument();
	});

	it('calls clearOrder with "direct" when DIRECT button is clicked', () => {
		renderComponent();
		fireEvent.click(screen.getByText("DIRECT"));
		expect(mockSetOrders).toHaveBeenCalledWith({
			number: "DIRECT",
			channel: "Sur place",
			orderId: null,
			food: [],
			tmp: {},
		});
		expect(mockSetConfig).toHaveBeenCalledWith({
			payement: false,
			firstSend: true,
			id_order: null,
		});
		expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
		expect(mockSetModalOpen).toHaveBeenCalledWith(false);
	});

	it('calls clearOrder with "eatin" when Sur place button is clicked', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(5),
			}),
		);

		renderComponent();
		fireEvent.click(screen.getByText("Sur place"));

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem(
				"restaurantID",
			)}/orders/number?channel=eatin`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			},
		);

		await screen.findByText("Sur place"); // Wait for fetch to resolve
		expect(mockSetOrders).toHaveBeenCalledWith(
			expect.objectContaining({
				number: expect.any(String),
				channel: "Sur place",
				orderId: null,
				food: [],
				tmp: {},
			}),
		);
		expect(mockSetConfig).toHaveBeenCalledWith({
			payement: false,
			firstSend: true,
			id_order: null,
		});
		expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
		expect(mockSetModalOpen).toHaveBeenCalledWith(false);
	});

	it('calls clearOrder with "togo" when A emporter button is clicked', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(10),
			}),
		);

		renderComponent();
		fireEvent.click(screen.getByText("A emporter"));

		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem(
				"restaurantID",
			)}/orders/number?channel=togo`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			},
		);

		await screen.findByText("A emporter"); // Wait for fetch to resolve
		expect(mockSetOrders).toHaveBeenCalledWith({
			number: expect.any(String),
			channel: "A emporter",
			orderId: null,
			food: [],
			tmp: {},
		});
		expect(mockSetConfig).toHaveBeenCalledWith({
			payement: false,
			firstSend: true,
			id_order: null,
		});
		expect(mockSetSelectedOrder).toHaveBeenCalledWith("");
		expect(mockSetModalOpen).toHaveBeenCalledWith(false);
	});
});
