import "./App.css";
import React, { useState } from "react";

import AddDriver from "./components/AddDriver";
import DriverList from "./components/DriverList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [data,setData] = useState([]);
  console.log(data,"data................................");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/adddriver" element={<AddDriver setData={setData} data={data} />} />
          <Route path="/" element={<DriverList data={data} setData={setData}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
