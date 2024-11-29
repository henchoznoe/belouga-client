import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/utils/routes.tsx";
import { AuthProvider } from "@/shared/context/AuthContext.tsx";
import '@/styles/global.css'

const app = document.getElementById('app')!;

const router = createBrowserRouter(routes);

createRoot(app).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
