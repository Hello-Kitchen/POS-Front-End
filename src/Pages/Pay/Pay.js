import {React, useEffect} from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

import Calculator from './../../Components/Calculator/Calculator';
import ModsPay from '../../Components/ModsPay/ModsPay';
import OptionsPay from '../../Components/OptionsPay/OptionsPay'

const Pay = () => {
  const navigate = useNavigate();
  const { config, priceLess, setPriceLess, payList, setPayList } = useOutletContext();

  useEffect(() => {
    
    if (config.payement === false)
      navigate('/dashboard')

  }, []);

  return (
    <div className='h-full w-3/4 flex flex-col'>
      <OptionsPay buttons={[{name: "Reduction", func: null}, {name: "Offert", func: null}, {name: "Fidelite", func: null}, {name: "Annuler l'encaissement", func: null}]}></OptionsPay>
      <div className='w-full h-1/2 flex flex-rows p-2'>
        <ModsPay buttons={["Titres-Restaurant", "Especes", "CB Montant", "CB Total"]} setPayList={setPayList} priceLess={priceLess} payList={payList} setPriceLess={setPriceLess} />
        <Calculator priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList}/>
      </div>
    </div>
  );
};

export default Pay;