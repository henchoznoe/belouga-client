import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@components/global/Header.tsx";
import Footer from "@components/global/Footer.tsx";
import ScrollToTop from "@components/global/ScrollToTop.tsx";
import { motion } from "framer-motion";

const RootLayout = () => {
  return (
    <ScrollToTop>
      <motion.header
        className="sticky top-0 z-50 border !border-belouga-blue !border-x-zinc-800 !border-t-zinc-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <Header/>
      </motion.header>
      <main className="min-h-[calc(100dvh-60px)]">
        <Outlet/>
        <Toaster richColors/>
      </main>
      <footer className="border !border-t-belouga-blue !border-x-zinc-800 !border-b-zinc-800">
        <Footer/>
      </footer>
    </ScrollToTop>
  );
}

export default RootLayout;
