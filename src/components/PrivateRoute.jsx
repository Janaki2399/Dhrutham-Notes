import { useAuth } from "../contexts/auth-context";
import { Route, useLocation } from "react-router";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ path, element }) {
  const location = useLocation();
  const { token } = useAuth();
  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  );
}
