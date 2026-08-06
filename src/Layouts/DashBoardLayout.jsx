import { Link, Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import { CgProfile } from "react-icons/cg";
import { LuHeartHandshake } from "react-icons/lu";
import "./DashboardLayout.css";
import { FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import useAxiosSeccure from "../Hooks/useAxiosSeccure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const axiosSeccure = useAxiosSeccure();
  const { data: userProfile = [], isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSeccure.get(`/users/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  if (profileLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="drawer lg:drawer-open bg-secondary/10">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle inline"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-10 w-full bg-secondary/30 backdrop-blur-lg">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to={"/"}>
            <Logo></Logo>
          </Link>
        </nav>
        {/* Page content here */}
        <div>
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex text-white lg:text-black min-h-full flex-col items-start bg-secondary/30 backdrop-blur-2xl is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <div className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right sl"
                data-tip="Homepage"
                to={"/dashboard"}
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* My Custom Links */}

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right sl"
                data-tip="Request A Donation"
                to={"/dashboard/create-donation-request"}
              >
                {/* icon */}
                <LuHeartHandshake />
                <span className="is-drawer-close:hidden">
                  Request A Donation
                </span>
              </Link>
            </li>

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right sl"
                data-tip="My Donation Requests"
                to={"/dashboard/my-donation-requests"}
              >
                {/* icon */}
                <FaHandHoldingHeart />
                <span className="is-drawer-close:hidden">
                  My Donation Requests
                </span>
              </Link>
            </li>
            {userProfile.role === "admin" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right sl"
                  data-tip="All Users"
                  to={"/dashboard/all-users"}
                >
                  {/* icon */}
                  <FaUsers />
                  <span className="is-drawer-close:hidden">
                    All Users
                  </span>
                </Link>
              </li>
            )}

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right sl"
                data-tip="Profile"
                to={"/dashboard/profile"}
              >
                {/* icon */}
                <CgProfile />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
