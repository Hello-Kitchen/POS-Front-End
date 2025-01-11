import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import CurrentCommand from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter from "../Components/LayoutFooter/LayoutFooter";
import OrdersView from "../Components/OrdersView/OrdersView";

/**
 * Component : Main Layout of the POS Application, Main Component.
 *
 * @component Layout
 * @param {[Object]} orders current order
 * @param {Number} price full price of the current order
 * @param {Object} config state of the current order
 * @param {Function} setConfig state function to update the config of the current order
 * @param {Function} setOrders state function to update the current orders
 * @param {Number} priceLess full price of the current order
 * @param {Function} setPriceLess state function to update full price of the current order
 * @param {[Number]} payList List of all current transactions
 * @param {Function} setPayList state function to update the payList
 * @param {Object} orderDetails Object of the selected food
 * @param {Function} setOrderDetails state function used to update the selected food
 */
const Layout = ({
  price,
  config,
  setConfig,
  priceLess,
  setPriceLess,
  payList,
  setPayList,
  orderDetails,
  setOrderDetails,
  orders,
  setOrders
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  /**
   * @function updateActiveTab
   * @description Updates the active tab for navigation.
   *
   * @param {string} newTab - The new tab to set as active.
   */
  const updateActiveTab = (newTab) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    console.log(orders);
    }, [orders]);

  useEffect(() => {
    if (selectedOrder !== "") {
      setActiveTab("");
      fetch(
        `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${process.env.REACT_APP_NBR_RESTAURANT}/orders/${selectedOrder}`,
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
          console.log(data);

          // Group food by parts
          const groupedByPart = data.food_ordered.reduce((groups, food) => {
            if (!groups[food.part]) {
              groups[food.part] = [];
            }
            groups[food.part].push({ ...food, quantity: undefined });
            return groups;
          }, {});

          // Add a stop between each part
          const orderedFoods = [];
          const parts = Object.keys(groupedByPart).sort((a, b) => a - b); // Sort parts by number
          parts.forEach((part, index) => {
            orderedFoods.push(...groupedByPart[part]); 
            if (index < parts.length - 1) {
              orderedFoods.push({stop: true});
            }
          });

          console.log("Ordered Foods:", orderedFoods);

          setOrders([
            { nb: data.number },
            orderedFoods,
            { channel: data.channel },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedOrder, setOrders]);

  return (
    <div className="column w-full h-full">
      <LayoutHeader textLeft="05 - Francois Dupont" textCenter="Caisse 1" />
      <div className="w-full h-4/5">
        <CurrentCommand
          orders={orders}
          config={config}
          setConfig={setConfig}
          setOrders={setOrders}
          price={price}
          priceLess={priceLess}
          payList={payList}
        />
        {activeTab === "" && (
          <Outlet
            context={{
              orders,
              setOrders,
              price,
              config,
              setConfig,
              priceLess,
              setPriceLess,
              payList,
              setPayList,
              orderDetails,
              setOrderDetails,
            }}
          />
        )}
        {activeTab === "COMMANDES" && (
          <OrdersView orderSelect={setSelectedOrder} />
        )}
      </div>
      <LayoutFooter
        buttons={["tables", "commandes", "gestion"]}
        price={price.toString()}
        config={config}
        setConfig={setConfig}
        priceLess={priceLess}
        setOrders={setOrders}
        activeTab={activeTab}
        updateActiveTab={updateActiveTab}
      />
    </div>
  );
};

Layout.propTypes = {
  orders: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  setConfig: PropTypes.func.isRequired,
  setOrders: PropTypes.func.isRequired,
  setPayList: PropTypes.func.isRequired,
  priceLess: PropTypes.number.isRequired,
  payList: PropTypes.array.isRequired,
  setPriceLess: PropTypes.func.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setOrderDetails: PropTypes.func.isRequired,
};

export default Layout;
