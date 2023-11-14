import { useContext } from "react";
import Contextpage from "../Contextpage";
import useReduxAuthState from "../use-redux-auth-state";

function Navbar() {
  const auth = useReduxAuthState();
  const noimage = "../assets/images/blankProfile.png";
  const image = auth.user ? "./src/assets/images/User.jpg" : noimage;
  return (
    <div className="navbar  w-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Home
        </a>
      </div>
      <div className="flex-none gap-2">
        {auth.user ? (
          <div className="form-control">Hi {auth.user.username}</div>
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
        {auth.user ? (
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
                <a href="/logout">Logout</a>
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
