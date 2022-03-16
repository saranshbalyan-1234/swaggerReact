import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Components/Auth/Login";
import Test from "./Test";
import Register from "./Components/Auth/Register";
render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="test" element={<Test />} />
      <Route path="register" element={<Register />} />
      <Route path="swagger" element={<App />}>
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
