import { RouteObject } from "react-router-dom";
import RootLayout from "@pages/public/RootLayout.tsx";
import Home from "@pages/public/Home.tsx";
import Login from "@pages/public/Login.tsx";
import Dashboard from "@pages/admin/Dashboard.tsx";
import ProtectedRoute from "@/utils/ProtectedRoute.tsx";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '*',
        element: <Home/>
      },
      {
        path: '/admin',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
]
