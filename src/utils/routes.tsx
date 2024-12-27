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
import AddAdminForm from "@components/admin/admins/AddAdminForm.tsx";
import AddPlayerForm from "@components/admin/players/AddPlayerForm.tsx";
import AddTeamForm from "@components/admin/teams/AddTeamForm.tsx";
import SignUp from "@pages/public/SignUp.tsx";
import AddMatchForm from "@components/admin/matches/AddMatchForm.tsx";
import EditAdminForm from "@components/admin/admins/EditAdminForm.tsx";
import EditPlayerForm from "@components/admin/players/EditPlayerForm.tsx";
import EditTeamForm from "@components/admin/teams/EditTeamForm.tsx";
import EditMatchForm from "@components/admin/matches/EditMatchForm.tsx";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      { path: '/', element: <Home/> },
      { path: '/stream', element: <Stream/> },
      { path: '/contact', element: <Contact/> },
      { path: '/login', element: <Login/> },
      { path: '/signup', element: <SignUp/> },
      { path: '*', element: <Home/> },
      {
        path: '/admin',
        element: (
          <ProtectedRoute requiredPermission={1}>
            <AdminLayout/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard', element: (
              <ProtectedRoute requiredPermission={1}>
                <Dashboard/>
              </ProtectedRoute>
            )
          },
          {
            path: 'admins', element: (
              <ProtectedRoute requiredPermission={2}>
                <Admins/>
              </ProtectedRoute>
            ),
          },
          {
            path: 'admins/add', element: (
              <ProtectedRoute requiredPermission={2}>
                <AddAdminForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'admins/edit/:id', element: (
              <ProtectedRoute requiredPermission={2}>
                <EditAdminForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'players', element: (
              <ProtectedRoute requiredPermission={1}>
                <Players/>
              </ProtectedRoute>
            )
          },
          {
            path: 'players/add', element: (
              <ProtectedRoute requiredPermission={1}>
                <AddPlayerForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'players/edit/:id', element: (
              <ProtectedRoute requiredPermission={1}>
                <EditPlayerForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'teams', element: (
              <ProtectedRoute requiredPermission={1}>
                <Teams/>
              </ProtectedRoute>
            )
          },
          {
            path: 'teams/add', element: (
              <ProtectedRoute requiredPermission={1}>
                <AddTeamForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'teams/edit/:id', element: (
              <ProtectedRoute requiredPermission={1}>
                <EditTeamForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'matches', element: (
              <ProtectedRoute requiredPermission={1}>
                <Matches/>
              </ProtectedRoute>
            )
          },
          {
            path: 'matches/add', element: (
              <ProtectedRoute requiredPermission={1}>
                <AddMatchForm/>
              </ProtectedRoute>
            )
          },
          {
            path: 'matches/edit/:id', element: (
              <ProtectedRoute requiredPermission={1}>
                <EditMatchForm/>
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
]
