import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@components/global/Header.tsx";
import Footer from "@components/global/Footer.tsx";
import ScrollToTop from "@components/global/ScrollToTop.tsx";

const RootLayout = () => {
  return (
    <ScrollToTop>
      <header className="sticky top-0 z-50 border !border-b-red-500/80 !border-x-zinc-800 !border-t-zinc-800">
        <Header/>
      </header>
      <main className="min-h-[calc(100dvh-60px)]">
        <Outlet/>
        <Toaster richColors/>
      </main>
      <footer className="border !border-t-red-500/80 !border-x-zinc-800 !border-b-zinc-800">
        <Footer/>
      </footer>
    </ScrollToTop>
  );
}

export default RootLayout;
