import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/home";
import { AuthLayout, Login, Register } from "../pages/auth";
import { AppLayout } from "../AppLayout";

const router = createBrowserRouter([
  {
    path: "",
    Component: AppLayout,
    children: [
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: '/auth',
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
