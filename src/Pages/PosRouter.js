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
  [
    { nb: '42' },
    [
    ],
    { channel: "Sur place" },
    { orderId: null }
  ];

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
  const [ready, setReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState({details: [], sups: []});

  //update the price of the current order every time the order is updated
  useEffect(() => {
    let tmp = 0;
    for (let i = 0; i < orders[1].length; i++) {
      if (orders[1][i].price)
        tmp += Number(orders[1][i].price);
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
            <Route path="/loading" element={<Loading />} />
            <Route path="/dashboard" element={<Layout orders={orders} setOrders={setOrders} price={price} config={config} setConfig={setConfig} priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />}>
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
