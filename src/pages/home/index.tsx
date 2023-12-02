import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../../hooks";
import { RegisterRole } from "../../api/auth";

export function Home() {
  const auth = useAuthenticated();

  if (auth?.role === RegisterRole.CUSTOMER) {
    return <Navigate to="/user" />;
  }
  if (auth?.role === RegisterRole.DRIVER) {
    return <Navigate to="/driver" />;
  }

  return null;
}

export default Home;
