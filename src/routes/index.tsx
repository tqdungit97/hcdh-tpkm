import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AppLayout } from "../AppLayout";
import { Home } from "../pages/home";
import { User } from "../pages/user";
import { Driver } from "../pages/driver";
import { AuthLayout, Login, Register } from "../pages/auth";
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
      {
        path: "/driver",
        Component: Driver,
      },
      {
        path: "/user",
        Component: User,
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
