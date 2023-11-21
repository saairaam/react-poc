import { IoHome } from 'react-icons/io5';
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-[72px]">404</h1>
      <h1 className="text-4xl">Page Not Found</h1>
      <h1 className="text-2xl">Its possible you are searching for a wrong page</h1>
      <h1 className="flex items-center gap-x-3">
        click here
        <a href="/">
          <IoHome />
        </a>
        to go to home page
      </h1>
    </div>
  );
};
export default PageNotFound;
