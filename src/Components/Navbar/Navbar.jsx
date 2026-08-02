import { Link, NavLink } from "react-router";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { CiLogin } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged out!");
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      <li>
        <NavLink>Donor</NavLink>
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
            className="menu menu-sm dropdown-content bg-base-100 font-bold rounded-box z-1 mt-3 w-52 p-2  shadow-md"
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
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn rounded-3xl bg-secondary flex items-center justify-between space-x-2 text-white hover:font-bold cursor-pointer"
          >
            <span>Log out</span>
            <AiOutlineLogout className="text-lg" />
          </button>
        ) : (
          <div>
            <NavLink
              to={"/auth"}
              className={
                "btn rounded-3xl bg-secondary flex space-x-2 justify-center items-center text-white hover:font-bold cursor-pointer"
              }
            >
              Login <CiLogin className="text-lg"/>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
