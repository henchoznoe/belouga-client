import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@components/global/Header.tsx";
import Footer from "@components/global/Footer.tsx";

const RootLayout = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="min-h-dvh">
        <Outlet/>
        <Toaster richColors/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default RootLayout;
