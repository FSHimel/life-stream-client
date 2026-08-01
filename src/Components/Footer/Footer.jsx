import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div>
      <footer className="relative bg-black/10 px-6 md:px-16 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Brand + tagline - left */}
          <div>
            <Logo></Logo>
          </div>

          {/* Links - middle */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link className="text-[16px] hover:text-[15px] hover:text-blue-600">
              Privacy & Policy
            </Link>
            <Link className="text-[16px] hover:text-[15px] hover:text-blue-600">
              About Us
            </Link>
          </div>

          {/* Icon buttons - right */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/fshimel304"
              target="_blank"
              className="hover:text-blue-500 hover:text-[15px]"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/fshimel/"
              target="_blank"
              className="hover:text-sky-400 hover:text-[15px]"
            >
              Linkedin
            </a>
            <a
              href="https://www.instagram.com/fshimel_here/"
              target="_blank"
              className="hover:text-pink-500 hover:text-[15px]"
            >
              Instagram
            </a>
          </div>
        </div>
        <p className="text-[12px] text-secondary text-center">
          © 2026 LifeStream <span className="text-primary">Blood</span> Network.
          Every drop counts.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
