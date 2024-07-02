import React from 'react';
import { useNavigate } from "react-router-dom";

import Calculator from './../../Components/Calculator/Calculator';
import ModsPay from '../../Components/ModsPay/ModsPay';
import OptionsPay from '../../Components/OptionsPay/OptionsPay'

const Pay = ({ config }) => {
  const navigate = useNavigate();

  if (config.payement === false)
    navigate('/dashboard')

  return (
    <div className='h-full w-3/4 flex flex-col'>
        <OptionsPay buttons={["Reduction", "Offert", "Fidelite", "Annuler l'encaissement"]}></OptionsPay>
        <div className='w-full h-1/2 flex flex-rows p-2'>
            <ModsPay buttons={["Titres-Restaurant", "Especes", "CB Montant", "CB Total"]} />
            <Calculator />
        </div>
    </div>
  );
};

export default Pay;