import React, { useState, useContext } from "react";
import Contextpage from "../Contextpage";

function Navbar() {
  const { header, user } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);
  const [userData, setUserData] = useState(null);
  // console.log(user)
  const Navdata = [
    {
      id: 1,
      headername: "Genres",
      Name: "Genres",
      link: "/",
    },
    {
      id: 2,
      headername: "Trending Movies",
      Name: "Trending",
      link: "/trending",
    },
    {
      id: 3,
      headername: "Upcoming Movies",
      Name: "Upcoming",
      link: "/upcoming",
    },
    {
      id: 4,
      headername: "Favorite Movies",
      Name: "Favorites",
      link: "/favorite",
    },
  ];

  return (
    <div className="navbar  w-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Home</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="./src/assets/images/User.jpg" />
            </div>
          </label>
          {userData ? (
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" href="/login">
                  Login
                </a>
              </li>
              <li>
                <a className="justify-between" href="/signup">
                  Signup
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
