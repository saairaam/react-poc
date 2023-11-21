import useReduxAuthState from '../use-redux-auth-state';

function Navbar() {
  const auth = useReduxAuthState();
  const noimage = '../assets/images/blankProfile.png';
  const image = auth.user
    ? auth.user.picture
      ? auth.user.picture
      : `https://saairaam-react-poc.s3.amazonaws.com/users/${auth.user?.username}.png`
    : noimage;
  return (
    <div className="navbar  w-full">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case" href="/">
          Home
        </a>
      </div>
      <div className="flex-none gap-2">
        {auth.user ? (
          <div className="form-control">Hi {auth.user.username}</div>
        ) : (
          <>
            <div className="flex-1">
              <a className="btn btn-ghost text-xl normal-case" href="/login">
                Login
              </a>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost text-xl normal-case" href="/signup">
                SignUp
              </a>
            </div>
          </>
        )}
        {auth.user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={image} alt={auth.user.username} />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Navbar;
