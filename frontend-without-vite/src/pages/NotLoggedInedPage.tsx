import { IoHome } from 'react-icons/io5';
const NotLoggedInedPage = () => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-[72px]">404</h1>
      <h1 className="text-4xl">The page you are looking is for loggedin person only</h1>
      <h1 className="flex items-center gap-x-3">
        click here
        <a href="/login">
          <IoHome />
        </a>
        to login
      </h1>
    </div>
  );
};
export default NotLoggedInedPage;
