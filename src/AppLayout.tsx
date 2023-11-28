import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "./hooks";

export function AppLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />
  }

  return (
    <>
      <Outlet />
    </>
  );
}
