import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer, {
	FooterMainButton,
} from "../../Components/LayoutFooter/LayoutFooter";

jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(() => jest.fn()),
}));

describe("Footer Component", () => {
	let setConfig,
		setOrders,
		navigate,
		setPayDetail,
		setSelectedOrder,
		setPayList,
		updateActiveTab;

	beforeEach(() => {
		setConfig = jest.fn();
		setOrders = jest.fn();
		updateActiveTab = jest.fn();
		setPayDetail = jest.fn();
		setSelectedOrder = jest.fn();
		setPayList = jest.fn();
		navigate = useNavigate();
		navigate.mockClear();
	});

	test("renders buttons based on buttons prop", () => {
		const buttons = ["tables", "commandes"];

		const { rerender } = render(
			<Footer
				buttons={buttons}
				price="20"
				priceLess={0}
				config={{ payement: false }}
				setConfig={setConfig}
				setOrders={setOrders}
				activeTab=""
				clicking
				Terminée
				setSelectedOrder={setSelectedOrder}
				updateActiveTab={updateActiveTab}
				setPayDetail={setPayDetail}
				payDetail={[]}
				setPayList={setPayList}
			/>,
		);

		// Verify buttons that are present
		expect(screen.queryByText("TABLES")).toBeInTheDocument();
		expect(screen.queryByText("COMMANDES")).toBeInTheDocument();

		// Add a new button
		buttons.push("gestion");
		rerender(
			<Footer
				buttons={buttons}
				price="20"
				priceLess={0}
				config={{ payement: false }}
				setConfig={setConfig}
				setOrders={setOrders}
				activeTab=""
				setSelectedOrder={setSelectedOrder}
				updateActiveTab={updateActiveTab}
				setPayDetail={setPayDetail}
				payDetail={[]}
				setPayList={setPayList}
			/>,
		);

		// Check that the new button is rendered
		expect(screen.queryByText("GESTION")).toBeInTheDocument();
	});

	test("renders unknown button", () => {
		const buttons = ["unknownButton"];

		render(
			<Footer
				buttons={buttons}
				price="20"
				priceLess={0}
				config={{ payement: false }}
				setConfig={setConfig}
				setOrders={setOrders}
				activeTab=""
				setSelectedOrder={setSelectedOrder}
				updateActiveTab={updateActiveTab}
				setPayDetail={setPayDetail}
				payDetail={[]}
				setPayList={setPayList}
			/>,
		);
		expect(screen.queryByText("TABLES")).not.toBeInTheDocument();
		expect(screen.queryByText("COMMANDES")).not.toBeInTheDocument();
		expect(screen.queryByText("GESTION")).not.toBeInTheDocument();
	});

	// test('Terminée button priceLess <= 0 and payement = true', () => {
	//     const buttons = [];
	//     localStorage.setItem('userInfo', JSON.stringify({ id: 1 }));

	//     render(
	//         <Footer
	//             buttons={buttons}
	//             price="20"
	//             priceLess={0}
	//             config={{ payement: true }}
	//             setConfig={setConfig}
	//             setOrders={setOrders}
	//             activeTab=''
	//             updateActiveTab={updateActiveTab}
	//             setPayDetail={setPayDetail}
	//             payDetail={[]}
	//             setPayList={setPayList}
	//         />
	//     );

	//     expect(screen.getByText('Terminée')).toBeInTheDocument();
	// });

	// test('Retour navigate', () => {
	//     const buttons = [];
	//     const mockNavigate = jest.fn();
	//     useNavigate.mockReturnValue(mockNavigate);
	//     localStorage.setItem('userInfo', JSON.stringify({ id: 1 }));

	//     render(
	//         <Footer
	//             buttons={buttons}
	//             price="20"
	//             priceLess={0}
	//             config={{ payement: true }}
	//             setConfig={setConfig}
	//             setOrders={setOrders}
	//             activeTab=''
	//             setSelectedOrder={setSelectedOrder}
	//             updateActiveTab={updateActiveTab}
	//             setPayDetail={setPayDetail}
	//             payDetail={[]}
	//             setPayList={setPayList}
	//         />
	//     );

	//     const retourButton = screen.getByText('Terminée');
	//     fireEvent.click(retourButton);

	//     expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
	// });

	// test('sets orders when Terminée button is clicked', () => {
	//     const buttons = [];
	//     localStorage.setItem('userInfo', JSON.stringify({ id: 1 }));

	//     render(
	//         <Footer
	//             buttons={buttons}
	//             price="20"
	//             priceLess={0}
	//             config={{ payement: true }}
	//             setConfig={setConfig}
	//             setOrders={setOrders}
	//             activeTab=''
	//             setSelectedOrder={setSelectedOrder}
	//             updateActiveTab={updateActiveTab}
	//             setPayDetail={setPayDetail}
	//             payDetail={[]}
	//             setPayList={setPayList}
	//         />
	//     );

	//     const terminéeButton = screen.getByText('Terminée');
	//     fireEvent.click(terminéeButton);

	//     expect(setOrders).toHaveBeenCalledWith([{nb: "42"}, [], {id_restaurant: 4}, {channel: "En salle"}]);
	// });

	test("Open the modal when new order button is clicked", () => {
		const mockSetOrders = jest.fn();
		const mockSetConfig = jest.fn();
		const mockSetSelectedOrder = jest.fn();
		const mockButtons = [];
		const mockUpdateActiveTab = jest.fn();
		const mockSetModalOpen = jest.fn();

		const { getByTestId } = render(
			<Footer
				buttons={mockButtons}
				price={0}
				config={{ payement: false, firstSend: true, id_order: null }}
				setConfig={mockSetConfig}
				priceLess={0}
				setOrders={mockSetOrders}
				activeTab={0}
				updateActiveTab={mockUpdateActiveTab}
				setSelectedOrder={mockSetSelectedOrder}
				setModalOpen={mockSetModalOpen}
				setPayDetail={setPayDetail}
				payDetail={[]}
				setPayList={setPayList}
			/>,
		);

		// Find the NewTicket element and click on it
		const newTicketElement = getByTestId("new-ticket");
		fireEvent.click(newTicketElement);

		expect(screen.getByText("DIRECT")).toBeInTheDocument();
	});

	describe("FooterMainButton", () => {
		let setConfig, setOrders, setPriceLess, setPayList, navigate;

		beforeEach(() => {
			setConfig = jest.fn();
			setOrders = jest.fn();
			setPriceLess = jest.fn();
			setPayList = jest.fn();
			navigate = jest.fn();
			require("react-router-dom").useNavigate.mockReturnValue(navigate);
			localStorage.setItem("userInfo", JSON.stringify({ id: 1 }));
			localStorage.setItem("restaurantID", "99");
			localStorage.setItem("token", "testtoken");
			process.env.REACT_APP_BACKEND_URL = "localhost";
			process.env.REACT_APP_BACKEND_PORT = "3000";
		});

		afterEach(() => {
			jest.clearAllMocks();
			localStorage.clear();
		});

		test("renders Encaisser button when priceLess > 0", () => {
			render(
				<FooterMainButton
					price="20"
					config={{ payement: false }}
					setConfig={setConfig}
					priceLess={10}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			expect(screen.getByText("Encaisser 20.00€")).toBeInTheDocument();
		});

		test("renders Encaisser button when payement is false", () => {
			render(
				<FooterMainButton
					price="15"
					config={{ payement: false }}
					setConfig={setConfig}
					priceLess={0}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			expect(screen.getByText("Encaisser 15.00€")).toBeInTheDocument();
		});

		test("renders Retour button when payement is true and priceLess > 0", () => {
			render(
				<FooterMainButton
					price="30"
					config={{ payement: true }}
					setConfig={setConfig}
					priceLess={5}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			expect(screen.getByText("Retour")).toBeInTheDocument();
		});

		test("renders Terminée button when payement is true and priceLess <= 0", () => {
			render(
				<FooterMainButton
					price="50"
					config={{ payement: true, id_order: 123 }}
					setConfig={setConfig}
					priceLess={0}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			expect(screen.getByText("Terminée")).toBeInTheDocument();
		});

		test("clicking Encaisser toggles payement and navigates", () => {
			render(
				<FooterMainButton
					price="20"
					config={{ payement: false }}
					setConfig={setConfig}
					priceLess={10}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			fireEvent.click(screen.getByText("Encaisser 20.00€"));
			expect(setConfig).toHaveBeenCalled();
			expect(navigate).toHaveBeenCalledWith("/dashboard/pay");
		});

		test("clicking Retour toggles payement and navigates", () => {
			render(
				<FooterMainButton
					price="20"
					config={{ payement: true }}
					setConfig={setConfig}
					priceLess={10}
					setOrders={setOrders}
					payDetail={[]}
					setPriceLess={setPriceLess}
					setPayList={setPayList}
				/>,
			);
			fireEvent.click(screen.getByText("Retour"));
			expect(setConfig).toHaveBeenCalled();
			expect(navigate).toHaveBeenCalledWith("/dashboard");
		});

		test("clicking Terminée calls handlePayement, resets state, and navigates", async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
			);
			await act(async () => {
				render(
					<FooterMainButton
						price="20"
						config={{ payement: true, id_order: 123 }}
						setConfig={setConfig}
						priceLess={0}
						setOrders={setOrders}
						payDetail={[{ test: 1 }]}
						setPriceLess={setPriceLess}
						setPayList={setPayList}
					/>,
				);
			});
			await act(async () => {
				fireEvent.click(screen.getByText("Terminée"));
			});
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/orders/payment/123"),
				expect.objectContaining({
					method: "PUT",
					headers: expect.objectContaining({
						"Content-Type": "application/json",
						Authorization: "Bearer testtoken",
					}),
					body: JSON.stringify({
						value: [{ test: 1 }],
						user: 1,
						discount: 0,
					}),
				}),
			);
			expect(setPriceLess).toHaveBeenCalledWith(0);
			expect(setPayList).toHaveBeenCalledWith([]);
			expect(setConfig).toHaveBeenCalled();
			expect(setOrders).toHaveBeenCalledWith({
				number: "Direct",
				channel: "LAD",
				orderId: null,
				food: [],
				tmp: {},
			});
			expect(navigate).toHaveBeenCalledWith("/dashboard");
			global.fetch.mockRestore();
		});
	});
});
