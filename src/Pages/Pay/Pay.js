import {React, useEffect} from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

import Calculator from './../../Components/Calculator/Calculator';
import ModsPay from '../../Components/ModsPay/ModsPay';
import OptionsPay from '../../Components/OptionsPay/OptionsPay'

/**
 * Component : Page, handles all transactions
 * 
 * @component Pay
 */
const Pay = () => {
  const navigate = useNavigate();
  const { config, setConfig, priceLess, setPriceLess, payList, setPayList, payDetail, setPayDetail } = useOutletContext();

  //If payment is complete, redirectes to dashboard
  useEffect(() => {
    
    if (config.payement === false)
      navigate('/dashboard')

  }, [config, navigate]);

  //If payment is canceled, resets order config, redirects to ddashboard
  function cancel () {
    setConfig(prevConfig => ({ ...prevConfig, payement: !prevConfig.payement }));
    navigate('/dashboard')
  }

  return (
    <div className='h-full w-3/4 flex flex-col'>
      <OptionsPay buttons={[{name: "Reduction", func: null}, {name: "Offert", func: null}, {name: "Fidelite", func: null}, {name: "Annuler l'encaissement", func: cancel}]} setConfig={setConfig} ></OptionsPay>
      <div className='w-full h-1/2 flex flex-rows p-2'>
        <ModsPay buttons={["Titres-Restaurant", "Especes", "CB Montant", "CB Total"]} setPayList={setPayList} priceLess={priceLess} payList={payList} setPriceLess={setPriceLess} setPayDetail={setPayDetail} payDetail={payDetail} />
        <Calculator priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList} payDetail={payDetail} setPayDetail={setPayDetail}/>
      </div>
    </div>
  );
};

export default Pay;