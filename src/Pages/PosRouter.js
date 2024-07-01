import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Loading from './Loading/Loading';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';
import FoodDetails from './FoodDetails/FoodDetails';


function PosRouter() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/loading" element={<Loading />}/>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="/dashboard/category/:id" element={<CategoryList />}/>
          <Route path="/dashboard/category/:id/:id" element={<FoodDetails />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default PosRouter;
