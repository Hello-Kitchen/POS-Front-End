import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Loading from './Loading/Loading';
import Dashboard from './Dashboard/Dashboard';
import Pay from './Pay/Pay';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';
import FoodLayout from './FoodDetails/FoodLayout';
import FoodDetails from './FoodDetails/FoodDetails';
import FoodModif from './FoodDetails/FoodModif/FoodModif';
 
let new_ex = { food: 1, plat: 'Hamburger', price: '15.60', details: ['Saignant', 'Frites', 'Salade'], mods_ingredients: [{type: 'ADD', ingredient: 'Fromage'}] }

let stock =
  [
    { nb: '42' },
    [
      { food: 1, plat: 'Burger Miam', price: '15', details: ['Saignant', 'Frites', 'Salade'], mods_ingredients: [{type: 'ADD', ingredient: 'Fromage'}, {type: 'ALL', ingredient: 'Oignon'}] },
      { food: 2, plat: 'Burger Gourmand', price: '17.99', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel' },
      { stop: true },
      { food: 3, plat: 'Boisson du Champion', price: '3' },
      { food: 1, plat: 'Burger Miam', price: '15', details: ['Saignant', 'Frites', 'Salade'], mods_ingredients: [{type: 'ADD', ingredient: 'Fromage'}, {type: 'ALL', ingredient: 'Oignon'}] },
      { food: 2, plat: 'Burger Gourmand', price: '17.99', details: ['Saignant', 'Frites', 'Salade'], note: 'Frites sans sel' },
    ],
    { id_restaurant: 4 },
    { channel: "En salle" },
  ];

let data =
  [
    { nb: '42' },
    [
      { food: 1, plat: 'Burger Miam', price: '15', details: ['Saignant', 'Frites', 'Salade'], mods_ingredients: [{type: 'ADD', ingredient: 'Fromage'}, {type: 'ALL', ingredient: 'Oignon'}] },
    ],
    { id_restaurant: 4 },
    { channel: "En salle" },
  ];

function PosRouter() {

  const [config, setConfig] = useState({ payement: false, firstSend: true });
  const [price, setPrice] = useState(null);
  const [orders, setOrders] = useState(data);
  const [priceLess, setPriceLess] = useState(price);
  const [payList, setPayList] = useState([]);
  const [ready, setReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState({details: [], sups: {current: 0, list: []}});

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
          <Route path="/loading" element={<Loading />} />
          <Route path="/dashboard" element={<Layout orders={orders} setOrders={setOrders} price={price} config={config} setConfig={setConfig} priceLess={priceLess} setPriceLess={setPriceLess} payList={payList} setPayList={setPayList} orderDetails={orderDetails} setOrderDetails={setOrderDetails} />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/pay" element={<Pay />} />
            <Route path="/dashboard/category/:id" element={<CategoryList />} />
            <Route path="/dashboard/category/:id/:id" element={<FoodLayout />}>
              <Route path="/dashboard/category/:id/:id" element={<FoodDetails />}/>
              <Route path="/dashboard/category/:id/:id/modification" element={<FoodModif />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default PosRouter;
