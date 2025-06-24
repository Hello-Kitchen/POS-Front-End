import React, { useEffect } from "react";

import OrdersRow from "./OrderRow";
import FilterButton from "./FilterButton";

import PropTypes from 'prop-types';
import { IoSwapHorizontal } from "react-icons/io5";

/**
 * OrdersView component displays a list of orders and allows filtering by channel.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.orderSelect - Function to handle order selection.
 *
 * @returns {JSX.Element} The OrdersView component.
 *
 * @example
 * <OrdersView orderSelect={handleOrderSelect} />
 *
 * @typedef {Object} Order
 * @property {string} id - The unique identifier of the order.
 * @property {string} number - The order number or table number.
 * @property {string} channel - The channel through which the order was placed.
 * @property {string} time - The time the order was placed.
 * @property {string} chrono - The elapsed time since the order was placed.
 */
export default function OrdersView({ orderSelect }) {
  const [displayPastOrders, setPastDisplayOrders] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState("Tous");
  const [orders, setOrders] = React.useState([]);
  const [displayedOrders, setDisplayedOrders] = React.useState([]);

  const handleChannelChange = () => {
    setPastDisplayOrders(!displayPastOrders);
  };

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized access. Please log in.");
        }
        return response.json();
      })
      .then((data) => {
        const orders = data.map((order) => {
          const time = new Date(order.date);
          const chronoMs = Date.now() - time.getTime();
          let chronoString = "";
      
          const hours = Math.floor(chronoMs / (1000 * 60 * 60));
          const minutes = Math.floor((chronoMs % (1000 * 60 * 60)) / (1000 * 60));
      
          if (hours > 0) {
            chronoString = String(hours).padStart(2, "0") + "h" + String(minutes).padStart(2, "0");
          } else {
            chronoString = String(minutes).padStart(2, "0") + "m";
          }

          return {
            id: order.id,
            number: order.number, 
            channel: order.channel,
            time: String(time.getHours()).padStart(2, "0") + "h" + String(time.getMinutes()).padStart(2, "0"),
            chrono: chronoString,
            total: order.total
          };
        });
      
        setOrders(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedChannel === "Tous") {
      setDisplayedOrders(orders);
    } else {
      setDisplayedOrders(
        orders.filter((order) => order.channel === selectedChannel)
      );
    }
  }, [orders, selectedChannel]);
  return (
    <div className="w-full flex flex-col p-3">
      <div className="flex flex-row pb-2 items-center">
        <div className="text-4xl md:text-2xl font-bold pr-2">
          {displayPastOrders ? "Commandes passées" : "Commandes en cours"}
        </div>
        <IoSwapHorizontal
          size={20}
          onClick={() => {
            handleChannelChange();
          }}
        />
      </div>
      <div className="flex items-center pb-2 space-x-2">
        <div className="text-2xl md:text-lg font-semibold shrink-0 pr-2">
          Canal
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2 whitespace-nowrap">
            <FilterButton
              selected={selectedChannel === "Tous"}
              text={"Tous"}
              onClick={() => setSelectedChannel("Tous")}
            />
            <FilterButton
              selected={selectedChannel === "Sur place"}
              text={"Sur place"}
              onClick={() => setSelectedChannel("Sur place")}
            />
            <FilterButton
              selected={selectedChannel === "A emporter"}
              text={"A emporter"}
              onClick={() => setSelectedChannel("A emporter")}
            />
            <FilterButton
              selected={selectedChannel === "LAD"}
              text={"LAD"}
              onClick={() => setSelectedChannel("LAD")}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col space-y-1 max-h-[calc(92vh-200px)]">
        {displayedOrders.map((order) => (
          <div key={order.id}>
            <div
                className="w-full h-1 border-b-[1px] border-black"
            />
            <div className="px-2 pt-1" onClick={() => orderSelect(order.id)}>
              <OrdersRow
                number={order.number}
                channel={order.channel}
                time={order.time}
                chrono={order.chrono}
                price={order.total}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrdersView.propTypes = {
  orderSelect: PropTypes.func.isRequired,
}