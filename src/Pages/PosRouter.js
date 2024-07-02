import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Pay from './Pay/Pay';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';

const data =
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
  const [config, setConfig] = useState({ payement: false });
  const [price, setPrice] = useState(0);
  const [orders, setOrders] = useState(data);
  let tmp = 0;

  useEffect(() => {

    for (let i = 0; i < orders.length; i++)
      tmp += Number(orders[1][i].price)
    setPrice(tmp);

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout orders={orders} price={price} config={config} />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/pay" element={<Pay config={config} />} />
          <Route path="/dashboard/category/:id" element={<CategoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default PosRouter;