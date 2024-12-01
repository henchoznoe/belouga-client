import { RouteObject } from "react-router-dom";
import RootLayout from "@pages/public/RootLayout.tsx";
import Home from "@pages/public/Home.tsx";
import Login from "@pages/public/Login.tsx";
import Dashboard from "@pages/admin/Dashboard.tsx";
import Stream from "@pages/public/Stream.tsx";
import Contact from "@pages/public/Contact.tsx";
import AdminLayout from "@pages/admin/AdminLayout.tsx";
import Admins from "@pages/admin/Admins.tsx";
import Players from "@pages/admin/Players.tsx";
import Teams from "@pages/admin/Teams.tsx";
import Matches from "@pages/admin/Matches.tsx";
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
        path: 'stream',
        element: <Stream/>
      },
      {
        path: 'contact',
        element: <Contact/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: '*',
        element: <Home/>
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute requiredPermission={1}>
            <AdminLayout/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute requiredPermission={1}>
                <Dashboard/>
              </ProtectedRoute>
            )
          },
          {
            path: 'admins',
            element: (
              <ProtectedRoute requiredPermission={2}>
                <Admins/>
              </ProtectedRoute>
            )
          },
          {
            path: 'players',
            element: (
              <ProtectedRoute requiredPermission={1}>
                <Players/>
              </ProtectedRoute>
            )
          },
          {
            path: 'teams',
            element: (
              <ProtectedRoute requiredPermission={1}>
                <Teams/>
              </ProtectedRoute>
            )
          },
          {
            path: 'matches',
            element: (
              <ProtectedRoute requiredPermission={1}>
                <Matches/>
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
]
