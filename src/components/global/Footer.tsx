import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <>
      <div className="m-4">
        <div className="w-full max-w-screen-xl mx-auto p-2">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href={import.meta.env.VITE_HOST}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src="/img/blue-logo.png" className="h-12" alt="BelougaTournament Logo"/>
              <span className="self-center text-md md:text-xl font-semibold whitespace-nowrap font-paladinsgrad">
                Belouga Tournament
              </span>
            </a>
            <ul
              className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0"
            >
              <Link to="/" className="hover:underline me-4 md:me-6">Home</Link>
              <Link to="/stream" className="hover:underline me-4 md:me-6">Stream</Link>
              <Link to="/contact" className="hover:underline me-4 md:me-6">Contact</Link>
              <Link to="/admin/dashboard" className="hover:underline me-4 md:me-6">Admin</Link>
            </ul>
          </div>
          <hr className="my-4 border-white sm:mx-auto"/>
          <div className="flex justify-center gap-2">
            <SocialIcon url="https://discord.gg/dmqUVfr4ft" target="_blank"/>
            <SocialIcon url="https://www.twitch.tv/quentadoulive" target="_blank"/>
            <SocialIcon url="https://www.youtube.com/@quentadou9064" target="_blank"/>
            <SocialIcon url="https://www.tiktok.com/@quentadou" target="_blank"/>
            <SocialIcon url="https://www.instagram.com/quentadou._" target="_blank"/>
          </div>
          <hr className="my-4 border-white sm:mx-auto"/>
          <span className="block text-sm sm:text-center">
            &copy; {new Date().getFullYear()} {" "}
            <a href={import.meta.env.VITE_HOST} className="hover:underline">BTP</a>. Tous droits réservés.<br/>
            Site web réalisé par <a
            href="https://henchoznoe.ch/"
            target="_blank"
            className="hover:underline">Noé Henchoz</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
