import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRouter from "./Router/AdminRouter";
import UserRouter from "./Router/UserRouter";
import LogoLoader from "./Components/LogoLoader";

function AppRoutes() {
  return (
    <>
      <LogoLoader />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
