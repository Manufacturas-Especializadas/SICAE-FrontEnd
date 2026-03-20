import { Route, Routes } from "react-router-dom";
import { CartDashboard } from "../pages/CartDashboard/CartDashboard";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CartDashboard />} />
    </Routes>
  );
};
