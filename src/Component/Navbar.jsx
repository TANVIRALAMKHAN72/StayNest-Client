import React, { useState } from "react";
import logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Logout Error: " + error.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/apartment">Apartment</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="cursor-pointer lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <img className="w-12 h-12 ml-3 cursor-pointer" src={logo} alt="logo" />
        <Link to="/" className="ml-3 text-xl font-bold">
          StayNest
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end mr-3 relative">
        {user ? (
          <div className="relative">
            <img
              onClick={toggleDropdown}
              src={user.photoURL || "/default-user.png"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
              title={user.displayName || "User"}
            />

            {dropdownOpen && (
              <ul
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20"
                onClick={() => setDropdownOpen(false)}
              >
                <li className="px-4 py-2 border-b text-gray-700 font-semibold">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link
                    to="/dashboard/my-profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline btn-primary px-5">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
