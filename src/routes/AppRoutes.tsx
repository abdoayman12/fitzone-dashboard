import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

// Pages (lazy imports for performance)
import DashboardPage from "../pages/DashboardPage";
import MembersPage from "../pages/MembersPage";
import ClassesPage from "../pages/ClassesPage";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import TrainersPage from "../pages/TrainersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
      </Route>
    </Routes>
  );
}
