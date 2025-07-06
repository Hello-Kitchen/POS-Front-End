import React from "react";

import { IoIosArrowForward } from "react-icons/io";
import PropTypes from 'prop-types';


/**
 * OrdersRow component renders a row displaying order details.
 *
 * @param {Object} props - The properties object.
 * @param {string|number} props.number - The order number.
 * @param {string} props.channel - The channel through which the order was placed.
 * @param {string} props.time - The time when the order was placed.
 * @param {string} props.chrono - The duration since the order was opened.
 * @param {number} props.price - The total price of the order.
 * @returns {JSX.Element} The rendered OrdersRow component.
 */
export default function OrdersRow({ number, channel, time, chrono, price, payment, timePayment}) {
    console.log(payment)
    const formatPaymentMessage = ((paymentInfo) => {
        const paymentTypes = {
            'cb': "carte bleue",
            'cash': "espèce",
        }
        if (paymentInfo.length === 1) {
            return "Règlement en " + paymentTypes[paymentInfo[0].type]
        } else {
            let max = 0;
            let maxIndex = 0;
            paymentInfo.forEach((e, i) => {
                if (max < parseInt(e.value)) {
                    max = parseInt(e.value);
                    maxIndex = i;
                }
            });
            return "Règlement en " + paymentTypes[paymentInfo[maxIndex].type]
        }
    });

    return (
        <div className="flex flex-row justify-between items-center">
            <div>
                <div className="flex flex-row">
                    <div className="text-lg font-semibold pr-1">
                        {number}
                    </div>
                    <div className="text-lg font-medium">
                        - {channel}
                    </div>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-600">
                    <div className=" pr-1">
                        {timePayment ? timePayment : time}
                    </div>
                    <div className="">
                        {
                            payment ? <>- {formatPaymentMessage(payment.value)}</> :
                            <>- Ouverte depuis {chrono}</>
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-1">
                <div className="text-xl font-bold">{price}€</div>
                <IoIosArrowForward size={25} />
            </div>
        </div>
    )
}

OrdersRow.propTypes = {
    number: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    chrono: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    payment: PropTypes.object.isRequired,
    timePayment: PropTypes.string.isRequired,
}