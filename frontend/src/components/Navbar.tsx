import { useContext } from "react";
import Contextpage from "../Contextpage";

function Navbar() {
  const { user } = useContext(Contextpage);
  // const user = { img: "" };
  const noimage = "../assets/images/blankProfile.png";
  const image = user ? "./src/assets/images/User.jpg" : noimage;
  return (
    <div className="navbar  w-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Home
        </a>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        ) : (
          <>
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl" href="/login">
                Login
              </a>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl" href="/signup">
                SignUp
              </a>
            </div>
          </>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={image} />
              </div>
            </label>

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
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
