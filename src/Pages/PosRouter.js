import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Pay from './Pay/Pay';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

let data =
  [
    { nb: '42' },
    [
      { plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], sups: ['Supplement fromages', 'Allergie Oignons'] },
      { plat: 'Entrecote Classique', price: '22.30', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel' },
      { stop: true },
      { plat: 'Brownie', price: '7.00' },
    ]
  ];

function PosRouter() {
  const [config, setConfig] = useState({ payement: false, firstSend: true });
  const [price, setPrice] = useState(null);
  const [orders, setOrders] = useState(data);
  const [priceLess, setPriceLess] = useState(price);
  const [payList, setPayList] = useState([]);
  const [ready, setReady] = useState(false);

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout orders={orders} setOrders={setOrders} price={price} config={config} setConfig={setConfig} priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList} />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/pay" element={<Pay />} />
            <Route path="/dashboard/category/:id" element={<CategoryList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default PosRouter;