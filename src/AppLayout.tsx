import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticated } from "./hooks";

export function AppLayout() {
  const auth = useAuthenticated();

  if (!auth) {
    return <Navigate to="/auth" />
  }

  return (
    <>
      <Outlet />
    </>
  );
}
