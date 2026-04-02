import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

// Pages (lazy imports for performance)
import DashboardPage from "../pages/DashboardPage";
import MembersPage from "../pages/MembersPage";
import ClassesPage from "../pages/ClassesPage";
import PaymentsPage from "../pages/PaymentsPage";
import SubscriptionsPage from "../pages/SubscriptionsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
      </Route>
    </Routes>
  );
}
