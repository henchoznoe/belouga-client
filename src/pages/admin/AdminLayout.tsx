import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/shared/hooks/useAuth.ts";
import { cn } from "@/utils/classNames.ts";
import { ArrowLeftIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";

type AdminMenus = {
  label: string;
  to: string;
  position: number;
};

const AdminLayout = () => {

  const authCtx = useAuth();
  const loc = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseMenus: AdminMenus[] = [
    { label: "Dashboard", to: "/admin/dashboard", position: 1 },
    { label: "Joueurs", to: "/admin/players", position: 3 },
    { label: "Equipes", to: "/admin/teams", position: 4 },
    { label: "Matches", to: "/admin/matches", position: 5 },
  ];

  if ( authCtx.admin?.permission === 2 ) baseMenus.push({ label: "Admins", to: "/admin/admins", position: 2 });

  const adminsMenus = baseMenus.sort((a, b) => a.position - b.position);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);


  return (
    <>
      <div className="flex min-h-[calc(100dvh-60px)] md:h-[calc(100dvh-60px)] py-2">
        <aside
          className={cn(
            'fixed z-10 top-0 left-0 rounded-r-2xl h-full w-60 bg-zinc-700 transition-transform transform md:translate-x-0 md:relative md:flex-shrink-0',
            isMenuOpen ? "translate-x-0" : "-translate-x-60"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 pt-6 flex justify-center">
              <h1 className="font-paladinsgrad text-2xl">Admin</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2 p-5">
                {adminsMenus.map((menu, index) => (
                  <li key={index}>
                    <Link
                      to={menu.to}
                      className={cn(
                        'block p-2 rounded hover:bg-zinc-600 font-paladins',
                        loc.pathname.startsWith(menu.to) ? 'bg-zinc-600' : ''
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {menu.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4">
              <button
                onClick={authCtx.logout}
                className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 flex justify-center"
              >
                <ArrowLeftStartOnRectangleIcon className="size-6"/>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between bg-zinc-700 py-4 px-6 md:hidden">
            <h1 className="font-paladinsgrad text-2xl">Admin</h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-xl"
            >
              {isMenuOpen ? <ArrowLeftIcon className="size-6"/> : <Bars3Icon className="size-6"/>}
            </button>

          </div>

          <div className="flex-1 p-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
