import React, { useState } from "react";
import AddDriver from "./components/AddDriver";
import DriverList from "./components/DriverList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [data,setData] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/add-driver" element={<AddDriver setData={setData} data={data} />} />
          <Route path="/" element={<DriverList data={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
