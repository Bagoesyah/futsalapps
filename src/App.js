import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layouts from "./components/Layouts";
import Page404 from "./pages/error/404";
import Formation from "./pages/Formation/Formation";

function App() {
  return (
    <Layouts>
      <Routes>
        <Route index element={<Home />} />
        <Route path="formation" element={<Formation />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layouts>
  );
}

export default App;
