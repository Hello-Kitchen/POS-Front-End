import React, { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import LayoutHeader from "../Components/LayoutHeader/LayoutHeader";
import CurrentCommand, { mergeAllDuplicatesBetweenStops } from "../Components/CurrentCommand/CurrentCommand";
import LayoutFooter, { FooterMainButton } from "../Components/LayoutFooter/LayoutFooter";
import TablesView from "../Components/TablesView/TablesView";
import OrdersView from "../Components/OrdersView/OrdersView";
import ManagerView from "./Manager/ManagerView";
import { Drawer } from "@mui/material";

/**
 * Component : Main Layout of the POS Application, Main Component.
 *
 * @component Layout
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
 * @param {[Object]} orders current order
 * @param {Function} setOrders state function used to update the current order
 * @param {[Object]} tableBoard Array Object of the current POS tables
 * @param {Function} setTableBoard state function used to update the tables board
 * @param {Array} payDetail Array Object of the current payed orders
 * @param {Function} setPayDetail state function used to update the payed orders
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
  setOrders,
  tableBoard,
  setTableBoard,
  payDetail,
  setPayDetail,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * @function updateActiveTab
   * @description Updates the active tab for navigation.
   *
   * @param {string} newTab - The new tab to set as active.
   */
  const updateActiveTab = (newTab) => {
    setActiveTab(newTab);
  };

  const reformatOrder = (order) => {
    let cleanOrder = {
      food: order.food,
      name: order.name,
      details: order.details,
      mods_ingredients: order.mods_ingredients,
      note: order.note,
      price: order.price.toString(),
      number: order.part,
    }
    return cleanOrder;
  };

  const formatAll = useCallback((orders) => {
    let newOrders = orders.map((order) => {
      return reformatOrder(order)
    })
    return newOrders;
  }, []);

  const ordersFoodString = JSON.stringify(orders.food);

  useEffect(() => {
    setOrders(prev => ({
      ...prev,
      food: mergeAllDuplicatesBetweenStops(prev.food)
    }));
  }, [ordersFoodString, setOrders]);

    const getRecallOrder = useCallback((orderId) => {
      setActiveTab("");
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders/${orderId}`,
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
            if (index + 1 >= data.part && index !== parts.length - 1) {
              orderedFoods.push({stop: true});
            }
          });

          setOrders({
            number: data.number,
            channel: data.channel,
            orderId: data.id,
            food: formatAll(orderedFoods),
          })
          config.id_order = data.id;
          setConfig(config);
        })
        .catch((error) => {
          config.id_order = null;
          setConfig(config);
          console.log(error);
        });
  }, [setOrders, setConfig, config, formatAll]);


  useEffect(() => {
    if (selectedOrder !== "") {
      getRecallOrder(selectedOrder);
    }
  }, [selectedOrder, getRecallOrder]);

  return (
    <div className="flex flex-col w-full h-screen">
      <LayoutHeader textCenter="Caisse 1" />
      <div className="w-full flex-1 flex flex-row">
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
            payDetail,
            setPayDetail,
          }}
          />
        )}
        {activeTab === "TABLES" && (
          <TablesView orders={orders} setOrders={setOrders} board={tableBoard} setBoard={setTableBoard} orderSelect={getRecallOrder} />
        )}
        {activeTab === "COMMANDES" && (
          <OrdersView orderSelect={getRecallOrder} />
        )}
        {activeTab === "GESTION" && (
          <ManagerView />
        )}
        {activeTab !== "TABLES" && activeTab !== "GESTION" && (
          <div className="h-full xl:w-1/4 lg:w-2/5 hidden lg:block">
            <div className="w-full h-full">
              <CurrentCommand
                orders={orders}
                config={config}
                setConfig={setConfig}
                setOrders={setOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
              />
            </div>
          </div>
        )}

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            paper: {
              sx: { width: '75%' },
            },
          }}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className="h-full w-full sm:h-[88%] overflow-y-auto">
              <CurrentCommand
                orders={orders}
                config={config}
                setConfig={setConfig}
                setOrders={setOrders}
                price={price}
                priceLess={priceLess}
                payList={payList}
              />
            </div>
            <div className="h-[75px] sm:h-lf w-full lg:hidden">
              <FooterMainButton
                price={price.toString()}
                config={config}
                setConfig={setConfig}
                priceLess={priceLess}
                setOrders={setOrders}
                payDetail={payDetail}
                setPriceLess={setPriceLess}
                setPayList={setPayList}
              />
            </div>
          </div>
        </Drawer>
      </div>
      <div className="h-[75px] sm:h-lf w-full flex flex-row mt-auto">
        <div className="w-full lg:w-3/4 h-full">
          <LayoutFooter
            buttons={["tables", "commandes", "gestion"]}
            price={price.toString()}
            config={config}
            setConfig={setConfig}
            priceLess={priceLess}
            setOrders={setOrders}
            activeTab={activeTab}
            updateActiveTab={updateActiveTab}
            setSelectedOrder={setSelectedOrder}
            payDetail={payDetail}
            setPriceLess={setPriceLess}
            setPayList={setPayList}
            setDrawerOpen={setDrawerOpen}
          />
        </div>
        <div className="xl:w-1/4 lg:w-2/5 h-full lg:block hidden">
          <FooterMainButton
            price={price.toString()}
            config={config}
            setConfig={setConfig}
            priceLess={priceLess}
            setOrders={setOrders}
            payDetail={payDetail}
            setPriceLess={setPriceLess}
            setPayList={setPayList}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  orders: PropTypes.object.isRequired,
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
  tableBoard: PropTypes.array.isRequired,
  setTableBoard: PropTypes.func.isRequired,
  payDetail: PropTypes.array.isRequired,
  setPayDetail: PropTypes.func.isRequired,
};

export default Layout;
