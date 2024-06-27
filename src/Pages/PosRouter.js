import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Layout';
import CategoryList from './CategoryList/CategoryList';


function PosRouter() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="/dashboard/category/:id" element={<CategoryList />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default PosRouter;