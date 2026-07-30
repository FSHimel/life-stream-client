import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  const links = (
    <>
      <Link>Privacy & Policy</Link>
      <Link>About Us</Link>
      <Link>Contacts</Link>
    </>
  );
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
            {links}
          </div>

          {/* Icon buttons - right */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Website"
              className="w-9 h-9 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <svg
                className="w-4 h-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Share"
              className="w-9 h-9 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <svg
                className="w-4 h-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.68 13.34a3 3 0 100-2.68m0 2.68a3 3 0 110-2.68m0 2.68l6.64 3.32m-6.64-6l6.64-3.32m0 0a3 3 0 105.02-2.4 3 3 0 00-5.02 2.4zm0 9.36a3 3 0 105.02 2.4 3 3 0 00-5.02-2.4z"
                />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-[8px] text-secondary text-center">
          © 2026 LifeStream <span className="text-primary">Blood</span> Network.
          Every drop counts.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
