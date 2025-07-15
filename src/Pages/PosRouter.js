import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Loading from './Loading/Loading';
import Dashboard from './Dashboard/Dashboard';
import Pay from './Pay/Pay';
import Layout from './Layout';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Initial data for the orders
// TMP : To be replaced when the 'New order' button is implemented
let data =
  {
    number: "42",
    channel: "Sur place",
    orderId: null,
    food: [],
    tmp: {}
  };

/**
 * Component : Main Component of the POS Application, used as the main Router, handles all initialisation of variables, states and routes needed for the POS.
 * 
 * @component PosRouter
 */
function PosRouter() {

  const [config, setConfig] = useState({ payement: false, firstSend: true, id_order: null});
  const [price, setPrice] = useState(null);
  const [orders, setOrders] = useState(data);
  const [priceLess, setPriceLess] = useState(price);
  const [payList, setPayList] = useState([]);
  const [payDetail, setPayDetail] = useState([]);
  const [ready, setReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState({details: [], sups: []});
  const [tableBoard, setTableBoard] = useState(localStorage.getItem("tables") ? JSON.parse(localStorage.getItem("tables")) : []);
  
  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tableBoard));
  }, [tableBoard]);

  //update the price of the current order every time the order is updated
  useEffect(() => {
    let tmp = 0;
    for (let i = 0; i < orders.food.length; i++) {
      if (orders.food[i].price) {
        for (let j = 0; j < orders.food[i].quantity; j++) {
          let priceSup = 0;
          if (orders.food[i].mods_ingredients) {
            orders.food[i].mods_ingredients.forEach((ingredient) => {
              if (ingredient.suppPrice) {
                priceSup += Number(ingredient.suppPrice);
              }
            });
          }
          tmp += Number(orders.food[i].price) + priceSup;
        }
      }
    }
    setPrice(tmp);
    setPriceLess(tmp);
    setReady(true)
  }, [orders]);

  if (ready) {
    return (
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loading" element={<Loading setTableBoard={setTableBoard} />} />
            <Route path="/dashboard" element={<Layout orders={orders} setOrders={setOrders} price={price} config={config} setConfig={setConfig} priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList} orderDetails={orderDetails} setOrderDetails={setOrderDetails} tableBoard={tableBoard} setTableBoard={setTableBoard} payDetail={payDetail} setPayDetail={setPayDetail} />}>
              <Route index element={<Dashboard orders={orders} setOrders={setOrders} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />} />
              <Route path="/dashboard/pay" element={<Pay />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DndProvider>
    );
  }
}

export default PosRouter;
