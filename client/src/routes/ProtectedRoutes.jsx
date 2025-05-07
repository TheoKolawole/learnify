import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated }) => {
  return !isAuthenticated ? (
    <Navigate to={`/login`} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;