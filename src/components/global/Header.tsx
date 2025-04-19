import { Navbar } from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/classNames.ts";
import useAuth from "@/shared/hooks/useAuth.ts";

type HeaderMenu = {
  label: string;
  to: string;
}

const Header = () => {

  const loc = useLocation();
  const authCtx = useAuth();

  const menus: HeaderMenu[] = [
    { label: "Tournois", to: "/tournaments" },
    { label: "Stream", to: "/stream" },
    { label: "Contact", to: "/contact" },
  ];

  if ( authCtx.isAuthenticated ) menus.push({ label: "Admin", to: "/admin/dashboard" });

  return (
    <>
      <Navbar fluid className="bg-zinc-800">
        <Navbar.Brand as={Link} href={import.meta.env.VITE_HOST}>
          <img src="/img/blue-logo.png" className="mr-3 h-6 sm:h-9 hidden lg:block" alt="Belouga Tournament Logo"/>
          <span className="whitespace-nowrap text-lg md:text-xl font-paladins">
            Belouga Tournament
          </span>
        </Navbar.Brand>
        <Navbar.Toggle className="hover:bg-zinc-700 focus:outline-none"/>
        <Navbar.Collapse>
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.to}
              className={cn(
                'mb-2 md:mb-0 rounded-lg text-white/80 hover:bg-zinc-700 py-2 ps-2 pe-3 transition-transform transform md:hover:scale-105 font-paladins',
                loc.pathname.startsWith(menu.to) ? 'bg-zinc-700' : ''
              )}
            >
              {menu.label}
            </NavLink>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
