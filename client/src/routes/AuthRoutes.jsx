import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Navigate to={`/user`} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;