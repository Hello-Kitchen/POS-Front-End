import { React, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ModsPay from "../../Components/ModsPay/ModsPay";
import OptionsPay from "../../Components/OptionsPay/OptionsPay";
import Calculator from "./../../Components/Calculator/Calculator";

/**
 * Component : Page, handles all transactions
 *
 * @component Pay
 */
const Pay = () => {
	const navigate = useNavigate();
	const {
		config,
		setConfig,
		priceLess,
		setPriceLess,
		payList,
		setPayList,
		payDetail,
		setPayDetail,
	} = useOutletContext();

	//If payment is complete, redirectes to dashboard
	useEffect(() => {
		if (config.payement === false) navigate("/dashboard");
	}, [config, navigate]);

	return (
		<div className="h-full w-3/4 flex flex-col">
			<OptionsPay setConfig={setConfig}></OptionsPay>
			<div className="w-full h-1/2 flex flex-rows p-2">
				<ModsPay
					buttons={["Titres-Restaurant", "Especes", "CB Montant", "CB Total"]}
					setPayList={setPayList}
					priceLess={priceLess}
					payList={payList}
					setPriceLess={setPriceLess}
					setPayDetail={setPayDetail}
					payDetail={payDetail}
				/>
				<Calculator
					priceLess={priceLess}
					setPriceLess={setPriceLess}
					payList={payList}
					setPayList={setPayList}
					payDetail={payDetail}
					setPayDetail={setPayDetail}
				/>
			</div>
		</div>
	);
};

export default Pay;
