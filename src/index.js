import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Components/Auth/Login";

import Register from "./Components/Auth/Register";
render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
