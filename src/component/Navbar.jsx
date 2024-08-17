import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Homepage</NavLink>
      </li>
      <li>
        <NavLink to={"contact"}>Contact</NavLink>
      </li>
      <li>
        <NavLink to={"login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"upload"}>Upload Product</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="text-xl font-bold">
          Stock<span className="text-green-500">Checker</span>
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="user photo" src={user?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                {user?.displayName}
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={() => signOutUser()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
