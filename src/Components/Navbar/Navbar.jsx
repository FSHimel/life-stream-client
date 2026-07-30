import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      <li>
        <NavLink>Donner</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar sticky top-4 z-50 rounded-full mt-4 bg-secondary/10 py-3 px-7 backdrop-blur-lg shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content text-primary font-bold rounded-box z-1 mt-3 w-52 p-2 bg-secondary/10 shadow-md"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu text-primary font-bold menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
