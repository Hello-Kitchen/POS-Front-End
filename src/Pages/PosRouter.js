import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Loading from './Loading/Loading';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';
import FoodLayout from './FoodDetails/FoodLayout';
import FoodDetails from './FoodDetails/FoodDetails';
import FoodModif from './FoodDetails/FoodModif/FoodModif';


function PosRouter() {

    const [orderDetails, setOrderDetails] = useState({details: [], sups: []});

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/loading" element={<Loading />}/>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="/dashboard/category/:id" element={<CategoryList />}/>
          <Route path="/dashboard/category/:id/:id" element={<FoodLayout />}>
            <Route path="/dashboard/category/:id/:id" element={<FoodDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} />}/>
            <Route path="/dashboard/category/:id/:id/modification" element={<FoodModif orderDetails={orderDetails} setOrderDetails={setOrderDetails} />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default PosRouter;
