import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./index.css";
import Home from "./Home.jsx";
import Form from "./pages/Form.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <Routes>
          {" "}
          {/*sets up routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
