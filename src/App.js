import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>}/>
        <Route path="login" element={<Login/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
