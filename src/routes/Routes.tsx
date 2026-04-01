import { Route, Routes } from "react-router-dom";
import { CartDashboard } from "../pages/CartDashboard/CartDashboard";
import { ReportsIndex } from "../pages/Reports/ReportsIndex";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CartDashboard />} />
      <Route path="/reportes" element={<ReportsIndex />} />
    </Routes>
  );
};
